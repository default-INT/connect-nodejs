import { Router } from 'express';
import { auth } from 'services/auth';
import { events } from 'services/events';
import { languages } from 'services/languages';

export const api = Router();

api.use('/auth', auth);
api.use('/events', events);
api.use('/languages', languages);
