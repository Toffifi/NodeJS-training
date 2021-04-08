export class ServerError extends Error {
  constructor() {
    super();
    this.message = 'Internal Server Error';
  }
  code: number = 500;
}
