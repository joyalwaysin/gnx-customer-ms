import { Module } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';
import { ValidationController } from '../validation/validation.controller';

@Module({
  controllers: [ValidationController],
  providers: [ValidationService]
})
export class ValidationModule {}
