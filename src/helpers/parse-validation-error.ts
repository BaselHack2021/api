import { Result, ValidationError } from 'express-validator';

export default function parseValidationErrors(errors: Result<ValidationError>): {
  [param: string]: {
    message: string;
    debug?: string;
    value: string | number | boolean;
  };
} {
  const obj: {
    [param: string]: {
      message: string;
      debug?: string;
      value: string | number | boolean;
    };
  } = {};

  errors.array().forEach((error: ValidationError) => {
    obj[error.param] = {
      message: error.msg,
      value: error.value,
    };
  });

  return obj;
}
