import { MainService } from 'src/services/main.service';
import { MainResponseDto } from 'src/dto/main.dto';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  public gitData(): MainResponseDto {
    return this.mainService.gitData();
  }
}
