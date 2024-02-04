// logger.module.ts

import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService], // Export the logger service to make it accessible in other modules
})
export class LoggerModule {}
