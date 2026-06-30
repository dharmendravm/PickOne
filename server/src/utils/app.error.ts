export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: Record<string, string> | null;

  constructor(
    message: string,
    statusCode: number,
    errors: Record<string, string> | null = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // To Fix TypeScript compilation stack trace
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
