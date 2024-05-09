import { Router } from 'express';
import { auth } from 'services/auth';

export const api = Router();

api.use('/auth', auth);
