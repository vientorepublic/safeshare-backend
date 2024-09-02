import { StatusService } from 'src/services/status.service';
import { GlobalStatusDto } from 'src/dto/status.dto';
import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('global')
  public getGlobalStatus(): Promise<GlobalStatusDto> {
    return this.statusService.getGlobalStatus();
  }
}
