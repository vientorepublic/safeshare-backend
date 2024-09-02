import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { typeormConfig } from 'src/database/database.provider';
import { DownloadModule } from './download.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DetailsModule } from './details.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusModule } from './status.module';
import { UploadModule } from './upload.module';
import { TasksModule } from './tasks.module';
import { MainModule } from './main.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-*': 'en',
        'ko-*': 'ko',
      },
      loaderOptions: {
        path: join(__dirname, '..', '/i18n/'),
        watch: true,
      },
      resolvers: [new QueryResolver(['lang']), AcceptLanguageResolver],
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    MainModule,
    UploadModule,
    DownloadModule,
    DetailsModule,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
