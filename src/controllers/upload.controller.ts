import { TypedQuery, TypedRoute } from '@nestia/core';
import {
  Body,
  Controller,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadDto, UploadQueryDto } from 'src/dto/file.dto';
import { UploadService } from 'src/services/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @TypedRoute.Post()
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(
    @Req() req: Request,
    @I18n() i18n: I18nContext,
    @TypedQuery() query: UploadQueryDto,
    @UploadedFile() file: Express.Multer.File,
    @Body('g_recaptcha_response') token: string,
  ): Promise<UploadDto> {
    return this.uploadService.upload(req, i18n, query, token, file);
  }
}
