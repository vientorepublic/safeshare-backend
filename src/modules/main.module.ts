import { MainController } from 'src/controllers/main.controller';
import { MainService } from 'src/services/main.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
