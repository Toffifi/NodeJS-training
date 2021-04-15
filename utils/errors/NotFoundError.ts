export interface CustomError {
  message: string;
  name: string;
}

export class NotFoundError extends Error implements CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'ObjectNotFound';
  }
}
