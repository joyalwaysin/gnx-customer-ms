import { Injectable } from '@nestjs/common';
import * as validationRules from '../../vRule/validation-rules.update.json';
import * as formRules from '../../form/form-collections.json';
import * as form_Config from '../../form/form-config.json';

@Injectable()
export class ValidationService {
 

async findAll() {


  let jsonResponse = validationRules

  return jsonResponse;
  }

  findOne(id: number) {
    return `This action returns a #${id} validation`;
  }

 

  remove(id: number) {
    return `This action removes a #${id} validation`;
  }

  async findForm(){

    let formConfig = form_Config

    let formCollections = formRules

    const formValidations = validationRules

    let res = {formConfig, formCollections, formValidations}
  
    return {data:res}
  }
}
