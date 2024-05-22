import { Router } from 'express';
import { auth } from 'services/auth';
import { events } from 'services/events';

export const api = Router();

api.use('/auth', auth);
api.use('/events', events);
