import { MainResponseDto } from 'src/dto/main.dto';
import { Injectable } from '@nestjs/common';
import cluster from 'cluster';

@Injectable()
export class MainService {
  gitData(): MainResponseDto {
    return {
      WORKER_ID: cluster.worker?.id || 0,
    };
  }
}
