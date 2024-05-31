import { Router } from 'express';
import { asyncErrorHandler } from 'shared/utils/asyncErrorHandler';
import { getCurrentUser } from './_controllers/getCurrentUser';

export const accounts = Router();

accounts.get('/getCurrentUser', asyncErrorHandler(getCurrentUser));
