import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject } from 'zod';
import { ValidationError } from 'shared/errors/400/ValidationError';

type TSchema = ZodObject<any, any> | (() => ZodObject<any, any>);

export enum SelectorType {
  Body = 'body',
  Query = 'query',
  Params = 'params',
}

export const validate = (schema: TSchema, selector?: SelectorType) => (
  req: Request,
  _:Response,
  next: NextFunction,
) => {
  try {
    if (typeof schema === 'function') {
      schema().parse(req[selector || SelectorType.Body]);

      return next();
    }
    schema.parse(req[selector || SelectorType.Body]);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors
        .map((issue: any) => `${issue.path.join('.')} is ${issue.message}`)
        .join(', ');

      throw new ValidationError(errorMessages);
    }

    throw error;
  }
};
