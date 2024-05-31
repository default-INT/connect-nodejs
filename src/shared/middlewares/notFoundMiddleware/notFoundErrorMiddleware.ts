import { RequestHandler } from 'express';
import { NotFoundError } from 'shared/errors/404/NotFoundError';

export const notFoundErrorMiddleware: RequestHandler = (_, __, next) => next(new NotFoundError());
