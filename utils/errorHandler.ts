import mongoDb from 'mongoDb';

import { ApiError } from '../interfaces';
import { NotFoundError } from './errors/NotFoundError';

export default function errorHandler(error: Error): ApiError {
  let newError: ApiError = {
    code: null,
    name: null,
    message: error.message,
  };

  console.log(error instanceof NotFoundError);

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

    case 'ObjectNotFound':
      newError.code = 404;
      newError.name = 'NOT_FOUND';
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
