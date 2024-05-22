import { Router } from 'express';
import { authMiddleware } from 'shared/middlewares/authMiddleware';
import { addEvent } from './_controllers/addEvent';
import { deleteEventById } from './_controllers/deleteEventById';
import { getEventById } from './_controllers/getEventById';
import { location } from './location';

export const events = Router();

events.use(authMiddleware);
events.use('/location', location);

events.post('/addEvent', addEvent);
events.post('/deleteEventById', deleteEventById);
events.get('/getEventById', getEventById);
