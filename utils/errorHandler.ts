import { ApiError } from './../interfaces';
import mongoose from 'mongoose';

export function errorHandler(error: Error): ApiError {
  const newError: ApiError = {
    message: error.message,
    code: null,
  };

  if (error instanceof mongoose.Error) {
    switch (error.name) {
      case 'MongooseError':
        newError.code = 500;

      case 'CastError' || 'ValidationError':
        newError.code = 400;
        break;

      default:
        newError.code = 0;
    }
  } else {
    newError.code = 0;
  }

  return newError;
}
