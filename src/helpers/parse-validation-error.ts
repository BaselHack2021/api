import { Result, ValidationError } from 'express-validator';

export default function parseValidationErrors(errors: Result<ValidationError>): {
  [param: string]: {
    message: string;
    debug?: string;
  };
} {
  const obj: {
    [param: string]: {
      message: string;
      debug?: string;
    };
  } = {};

  errors.array().forEach((error: ValidationError) => {
    obj[error.param] = {
      message: error.msg,
    };
  });

  return obj;
}
