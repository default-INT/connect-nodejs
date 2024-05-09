import { Router } from 'express';
import { authMiddleware } from 'shared/middlewares/authMiddleware';
import { googleSignIn } from './methods/googleSignIn';
import { accounts } from './accounts';

export const auth = Router();

auth.use('/accounts', authMiddleware, accounts);
auth.post('/google', googleSignIn);
