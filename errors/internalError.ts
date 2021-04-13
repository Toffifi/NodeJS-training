export class InternalError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;

    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
