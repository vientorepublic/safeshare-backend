import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { createReadStream, existsSync, statSync, unlinkSync } from 'fs';
import { FileEntity } from 'src/entities/file.entity';
import { recaptcha } from 'src/libraries/recaptcha';
import { InjectRepository } from '@nestjs/typeorm';
import { DownloadDto } from 'src/dto/file.dto';
import { Request, Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { contentType } from 'mime-types';
import { extname, join } from 'path';
import { Repository } from 'typeorm';

const recaptchaValidator = new recaptcha();
const uploadPath =
  process.env.UPLOAD_PATH || join(__dirname, '..', '..', 'upload');
const period = Number(process.env.EXPIRES) || 86400000;

@Injectable({ scope: Scope.REQUEST })
export class DownloadService {
  private readonly logger = new Logger(DownloadService.name);
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public async download(
    req: Request,
    res: Response,
    i18n: I18nContext,
    dto: DownloadDto,
  ): Promise<void> {
    const ip = (req.headers['x-forwarded-for'] ??
      req.socket.remoteAddress) as string;
    const { g_recaptcha_response, identifier } = dto;

    const verify = await recaptchaValidator.verify(g_recaptcha_response, ip);
    if (!verify.success) {
      throw new BadRequestException(i18n.t('lang.CAPTCHA_VALIDATION_FAILED'));
    }

    const now = new Date().getTime();

    const record = await this.fileRepository.findOne({
      where: {
        identifier,
      },
    });
    if (!record) {
      throw new NotFoundException(i18n.t('lang.NOT_FOUND'));
    }

    const filePath = join(uploadPath, identifier);
    const exists = existsSync(filePath);
    if (!exists) {
      throw new NotFoundException(i18n.t('lang.NOT_FOUND'));
    }

    const uploadAt = Number(record.upload_at);
    if (uploadAt + period < now) {
      try {
        unlinkSync(filePath);
      } catch (err) {
        this.logger.error(err);
      }
      this.fileRepository.delete({ identifier });
      throw new NotFoundException(i18n.t('lang.NOT_FOUND'));
    }

    let count = Number(record.maximum_count) || null;
    if (count) {
      record.maximum_count = --count;
    }

    const size = statSync(filePath).size;
    const fileName = record.original_filename;
    const decodedFilename = decodeURIComponent(fileName);
    const extension = extname(decodedFilename);

    res.set({
      'Content-Type': contentType(extension) || 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Length': size,
    });
    const stream = createReadStream(filePath);
    stream.addListener('close', () => {
      if (count === 0) {
        try {
          unlinkSync(filePath);
        } catch (err) {
          this.logger.error(err);
        }
        this.fileRepository.delete({ identifier });
      } else {
        this.fileRepository.save(record);
      }
    });
    stream.pipe(res);
  }
}
