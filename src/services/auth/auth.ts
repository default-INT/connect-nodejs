import { Router } from 'express';
import { authMiddleware } from 'shared/middlewares/authMiddleware';
import { asyncErrorHandler } from 'shared/utils/asyncErrorHandler';
import { validate } from 'shared/utils/validate';
import { googleSignIn, googleSignInSchema } from './_controllers/googleSignIn';
import { accounts } from './accounts';

export const auth = Router();

auth.use('/accounts', authMiddleware, accounts);
auth.post(
  '/google',
  validate(googleSignInSchema),
  asyncErrorHandler(googleSignIn),
);
