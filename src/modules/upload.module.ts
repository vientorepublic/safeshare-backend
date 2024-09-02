import { UploadController } from 'src/controllers/upload.controller';
import { UploadService } from 'src/services/upload.service';
import { FileEntity } from 'src/entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
