import { Router } from 'express';
import { validate } from 'shared/utils/validate';
import { asyncErrorHandler } from 'shared/utils/asyncErrorHandler';
import { refresh, refreshSchema } from './_controllers/refresh';

export const token = Router();

token.post('/refresh', validate(refreshSchema), asyncErrorHandler(refresh));
