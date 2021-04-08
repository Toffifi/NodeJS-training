export class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Not Found';
  }
  code: number = 404;
}
