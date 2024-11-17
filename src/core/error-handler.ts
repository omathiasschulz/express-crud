import { type NextFunction, type Request, type Response } from 'express';
import { ApiError } from './api-error';

/**
 * Retorna o status code e informações sobre o erro ocorrido
 *
 * @param error
 * @param _request
 * @param response
 * @param _next
 */
export const errorHandler = (
  error: Error | ApiError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message =
    error instanceof ApiError ? error.message : 'Internal Server Error';

  response.status(statusCode).json({ message });
};
