import { Controller, Get } from '@nestjs/common';
import { ValidationService } from '../validation/validation.service';

import { ApiTags } from '@nestjs/swagger';

@Controller('asc/api/v1.0')
@ApiTags('config')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get('formSettings')
  findForm() {
    return this.validationService.findForm();
  }
}
