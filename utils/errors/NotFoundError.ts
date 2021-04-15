import { CustomError } from './customError';
export class NotFoundError extends CustomError {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'NOT_FOUND';
  }

  code: number = 404;
}
