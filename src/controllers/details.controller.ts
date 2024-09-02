import { TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { IdentifierDto } from 'src/dto/file.dto';
import { DetailsService } from 'src/services/details.service';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @TypedRoute.Get()
  public getFileDetails(
    @I18n() i18n: I18nContext,
    @TypedQuery() query: IdentifierDto,
  ) {
    return this.detailsService.getFileDetails(i18n, query);
  }
}
