import { Injectable, NotFoundException } from '@nestjs/common';
import { FileEntity } from 'src/entities/file.entity';
import { FileDetailsDto } from 'src/dto/details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentifierDto } from 'src/dto/file.dto';
import { existsSync, statSync } from 'fs';
import { I18nContext } from 'nestjs-i18n';
import { contentType } from 'mime-types';
import { extname, join } from 'path';
import { Repository } from 'typeorm';

const uploadPath =
  process.env.UPLOAD_PATH || join(__dirname, '..', '..', 'upload');

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  public async getFileDetails(
    i18n: I18nContext,
    query: IdentifierDto,
  ): Promise<FileDetailsDto> {
    const { identifier } = query;
    const data = await this.fileRepository.findOne({
      where: {
        identifier,
      },
    });
    if (!data) {
      throw new NotFoundException(i18n.t('lang.NOT_FOUND'));
    }

    const { upload_at } = data;
    const fileName = decodeURIComponent(data.original_filename);

    const filePath = join(uploadPath, identifier);
    const exists = existsSync(filePath);
    if (!exists) {
      throw new NotFoundException(i18n.t('lang.NOT_FOUND'));
    }

    const size = statSync(filePath).size;
    const count = Number(data.maximum_count) || null;

    return {
      upload_at: Number(upload_at),
      original_filename: fileName,
      mime_type: contentType(extname(fileName)) || 'application/octet-stream',
      maximum_count: count,
      size,
    };
  }
}
