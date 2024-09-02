import { DetailsController } from 'src/controllers/details.controller';
import { DetailsService } from 'src/services/details.service';
import { FileEntity } from 'src/entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
