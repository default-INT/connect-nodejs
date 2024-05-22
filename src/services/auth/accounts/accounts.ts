import { Router } from 'express';
import { getCurrentUser } from './_controllers/getCurrentUser';

export const accounts = Router();

accounts.get('/getCurrentUser', getCurrentUser);
