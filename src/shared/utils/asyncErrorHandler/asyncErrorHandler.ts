import { RequestHandler } from 'express';

export const asyncErrorHandler = (asyncRouteFn: any): RequestHandler => (req, res, next) => {
  asyncRouteFn(req, res, next)
    .catch(next);
  };
