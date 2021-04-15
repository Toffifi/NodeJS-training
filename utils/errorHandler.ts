import mongoDb from 'mongoDb';

import { ApiError } from '../interfaces';

export default function errorHandler(error: Error): ApiError {
  let newError: ApiError = {
    code: null,
    name: null,
    message: error.message,
  };

  switch (error.name) {
    case 'MongooseError':
      newError.code = 500;
      newError.name = 'SERVER_ERROR';
      newError.message = 'Internal Server Error';
      break;

    case 'CastError':
    case 'ValidationError':
      newError.code = 400;
      newError.name = 'BAD_REQUEST';
      break;

    case 'MongoError':
      newError = handleMongoError(error as mongoDb.MongoError);
      break;

    default:
      newError.code = 500;
      newError.name = 'InternalError';
  }

  return newError;
}

function handleMongoError(error: mongoDb.MongoError): ApiError {
  switch (error.code) {
    case 11000:
      return {
        code: 409,
        name: 'CONFLICT',
        message: 'Category with this name already exists',
      };
    default:
      return {
        code: 500,
        name: 'InternalError',
        message: error.message,
      };
  }
}
