import { ApiError } from 'interfaces';

export class CustomError extends Error implements ApiError {
  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  code: number;
}
