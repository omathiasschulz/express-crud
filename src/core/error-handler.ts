import { type NextFunction, type Request, type Response } from 'express';
import { ApiError } from './api-error';
import { HttpCode } from '../enums/http-code.enum';

/**
 * Retorna o status code e informações sobre o erro ocorrido
 *
 * @param error
 * @param _req
 * @param res
 * @param _next
 */
export const errorHandler = (
  error: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);
  const statusCode =
    error instanceof ApiError
      ? error.statusCode
      : HttpCode.INTERNAL_SERVER_ERROR;

  const message =
    error instanceof ApiError ? error.message : 'Internal Server Error';

  res.status(statusCode).json({ message });
};
