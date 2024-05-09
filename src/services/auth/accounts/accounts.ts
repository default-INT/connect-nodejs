import { Router } from 'express';
import { getCurrentUser } from './methods/getCurrentUser';

export const accounts = Router();

accounts.get('/getCurrentUser', getCurrentUser);
