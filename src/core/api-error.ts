import { HttpCode } from '../enums/http-code.enum';

/**
 * Class ApiError
 */
export abstract class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Class BadRequestError
 */
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, HttpCode.BAD_REQUEST);
  }
}

/**
 * Class NotFoundError
 */
export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, HttpCode.NOT_FOUND);
  }
}
