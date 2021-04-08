export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
  }
  code: number = 409;
}
