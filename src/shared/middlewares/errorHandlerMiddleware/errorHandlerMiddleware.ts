import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  const statusCode = err.status ?? 500;
  const message = err.message ?? 'Something went wrong';
  const description = err?.description;

  return res.status(statusCode).json({
    error: statusCode,
    message,
    description,
  });
};
