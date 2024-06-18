import { Router } from 'express';
import { asyncErrorHandler } from 'shared/utils/asyncErrorHandler';
import { authMiddleware } from 'shared/middlewares/authMiddleware';
import { getList } from './_controllers/getList';

export const languages = Router();

languages.use(authMiddleware);
languages.get('/getList', asyncErrorHandler(getList));
