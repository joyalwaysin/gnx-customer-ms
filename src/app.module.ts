/* eslint-disable prettier/prettier */
import {  Module } from '@nestjs/common';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { ValidationModule } from './validation/validation.module';
import { LoggerService } from './common/logger/logger.service';
import { LoggingInterceptor } from './common/logger/logger.interceptor';
import { GlobalExceptionFilter } from './exceptionhandling/HttpException';
import { MockLibraryService } from './mocklibrary';
import { TenantService } from './tenant.service';
import { AssystService } from './assyst.service';
import { AWSService } from './aws.service';

@Module({
  imports: [ValidationModule],
  controllers: [AppController],
  providers: [
    AppService,
    TenantService,
    AssystService,
    AWSService,
    
    LoggerService,
    MockLibraryService,
    LoggingInterceptor,
    {
    provide: APP_FILTER,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(SchemaMiddleware).forRoutes('*'); // Apply to all routes
  // }
}
