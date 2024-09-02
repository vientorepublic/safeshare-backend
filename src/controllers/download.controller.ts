import { DownloadService } from 'src/services/download.service';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Req, Res } from '@nestjs/common';
import { DownloadDto } from 'src/dto/file.dto';
import { Request, Response } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @TypedRoute.Post()
  public downloadFile(
    @Req() req: Request,
    @Res() res: Response,
    @I18n() i18n: I18nContext,
    @TypedBody() dto: DownloadDto,
  ): Promise<void> {
    return this.downloadService.download(req, res, i18n, dto);
  }
}
