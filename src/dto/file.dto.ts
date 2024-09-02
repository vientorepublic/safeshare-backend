import { MessageDto } from './message.dto';

export class IdentifierDto {
  identifier: string;
}

export class UploadDto extends MessageDto implements IdentifierDto {
  identifier: string;
}

export class UploadQueryDto {
  name: string;
  count?: number;
}

export class DownloadDto extends IdentifierDto {
  g_recaptcha_response: string;
}
