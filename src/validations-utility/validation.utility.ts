import * as Joi from 'joi';

// ... rest of your code ...

export function createJoiSchema(validations: any[]): Joi.ObjectSchema {
  const schemaObj: any = {};

  validations.forEach((validation) => {
    const { field, validations: fieldValidations } = validation;
    let fieldSchema;

    // Use different schema type based on the validationType
    switch (validation.validationType) {
      case 'string':
        fieldSchema = Joi.string();
        break;
      case 'number':
        fieldSchema = Joi.number();
        break;
      case 'date':
        fieldSchema = Joi.date();
        break;
      // Add other validation types as needed

      default:
        fieldSchema = Joi.any();
        break;
    }
    fieldValidations.forEach((fieldValidation) => {
      switch (fieldValidation.type) {
        case 'max':
          fieldSchema = fieldSchema
            .allow('')
            .max(fieldValidation.value)
            .message(fieldValidation.message);
          break;
        case 'min':
          fieldSchema = fieldSchema
            .allow('')
            .min(fieldValidation.value)
            .message(fieldValidation.message);
          break;
        case 'required':
          fieldSchema = fieldSchema
            .required()
            .messages({ 'any.required': fieldValidation.message });

          if (fieldSchema.type === 'string') {
            fieldSchema = fieldSchema.empty('').trim();
          }
          break;
        case 'pattern':
          fieldSchema = fieldSchema
            .pattern(new RegExp(fieldValidation.value))
            .message(fieldValidation.message);
          break;
        case 'email':
          fieldSchema = fieldSchema.email().message(fieldValidation.message);
          break;
        case 'dates':
          fieldSchema = Joi.string().isoDate().message(fieldValidation.message);
          break;

        case 'date':
          fieldSchema = fieldSchema.allow('').messages({
            'date.base': fieldValidation.message,
          });

          if (validation.field === 'date_of_birth') {
            // Validation for 'date_of_birth' (does not allow future dates)
            fieldSchema = fieldSchema.custom((value, helpers) => {
              const currentDate = new Date();
              const inputDate = new Date(value);

              if (inputDate > currentDate) {
                return helpers.message({
                  custom: 'Date of birth cannot be a future date',
                });
              }
              return value;
            });
          } else {
            // Validation for other date fields (customize as needed)
            fieldSchema = Joi.date().allow('');
          }
          break;

        case 'guid':
          fieldSchema = fieldSchema
            .guid({ version: 'uuidv4' }) // Validate UUID with version 4
            .message(fieldValidation.message);
          break;
        case 'decimal': //accept decimal values(18,4)
          fieldSchema = Joi.number()
            .precision(18)
            .strict()
            .less(10000000000000000) // Maximum value for 18 digits
            .greater(-10000000000000000) // Minimum value for 18 digits
            .precision(4) // Maximum of 4 decimal places
            .message(fieldValidation.message);
          break;
        case 'phoneNumber':
          // Example regex for a simple international phone number format (adjust as needed)
          fieldSchema = Joi.string()
            .pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
            .message(fieldValidation.message || 'Invalid phone number format');
          break;
      }
    });

    schemaObj[field] = fieldSchema;
  });

  return Joi.object(schemaObj).options({ allowUnknown: true });
}

// validation.utility.ts
import * as yup from 'yup';

export function createYupSchema(validations: any[]): yup.Schema<any> {
  const schemaObj = {};

  validations.forEach((validation) => {
    const { field, validations: fieldValidations } = validation;
    let fieldSchema = yup.string();

    fieldValidations.forEach((fieldValidation) => {
      switch (fieldValidation.type) {
        case 'max':
          fieldSchema = fieldSchema.max(
            fieldValidation.value,
            fieldValidation.message,
          );
          break;
        case 'minLength':
          fieldSchema = fieldSchema.min(
            fieldValidation.value,
            fieldValidation.message,
          );
          break;
        case 'required':
          fieldSchema = fieldSchema.required(fieldValidation.message);
          break;
        case 'pattern':
          fieldSchema = fieldSchema.matches(
            new RegExp(fieldValidation.value),
            fieldValidation.message,
          );
          break;
        // Handle other validation types if needed
      }
    });

    schemaObj[field] = fieldSchema;
  });

  return yup.object().shape(schemaObj);
}
