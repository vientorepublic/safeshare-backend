import { TasksService } from 'src/services/tasks.service';
import { FileEntity } from 'src/entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
