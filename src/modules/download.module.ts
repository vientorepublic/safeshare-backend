import { DownloadController } from '../controllers/download.controller';
import { DownloadService } from 'src/services/download.service';
import { FileEntity } from 'src/entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [DownloadController],
  providers: [DownloadService],
})
export class DownloadModule {}
