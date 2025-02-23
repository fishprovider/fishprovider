export class BaseError extends Error {
  code: string;

  constructor(
    code: string,
    message?: string,
    cause?: any,
  ) {
    super(message, { cause });

    this.code = code;
  }
}
