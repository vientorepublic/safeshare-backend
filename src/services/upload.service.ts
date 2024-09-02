import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { UploadDto, UploadQueryDto } from 'src/dto/file.dto';
import { FileEntity } from 'src/entities/file.entity';
import { recaptcha } from 'src/libraries/recaptcha';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { writeFileSync } from 'fs';
import { Request } from 'express';
import { join } from 'path';
import typia from 'typia';

const recaptchaValidator = new recaptcha();
const uploadPath =
  process.env.UPLOAD_PATH || join(__dirname, '..', '..', 'upload');
const sizeLimit = Number(process.env.SIZE_LIMIT) || 15728640;

@Injectable({ scope: Scope.REQUEST })
export class UploadService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public async upload(
    req: Request,
    i18n: I18nContext,
    query: UploadQueryDto,
    token: string,
    file: Express.Multer.File,
  ): Promise<UploadDto> {
    const ip = (req.headers['x-forwarded-for'] ??
      req.socket.remoteAddress) as string;

    const validateToken = typia.is<string>(token);
    if (!validateToken) {
      throw new BadRequestException();
    }

    const verify = await recaptchaValidator.verify(token, ip);
    if (!verify.success) {
      throw new BadRequestException(i18n.t('lang.CAPTCHA_VALIDATION_FAILED'));
    }

    if (!file) {
      throw new BadRequestException(i18n.t('lang.FILE_NOT_SELECTED'));
    }

    if (file.size > sizeLimit) {
      throw new BadRequestException(i18n.t('lang.SIZE_LIMIT_EXCEEDED'));
    }

    const { name, count } = query;
    const now = new Date().getTime();
    const identifier = uuidV4();
    writeFileSync(join(uploadPath, identifier), file.buffer);

    const data = this.fileRepository.create({
      identifier,
      upload_at: now,
      original_filename: name,
      maximum_count: count || null,
    });
    this.fileRepository.save(data);

    return {
      message: i18n.t('lang.UPLOAD_SUCCESS'),
      identifier,
    };
  }
}
