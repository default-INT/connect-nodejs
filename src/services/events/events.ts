import { Router } from 'express';
import { authMiddleware } from 'shared/middlewares/authMiddleware';
import { asyncErrorHandler } from 'shared/utils/asyncErrorHandler';
import { SelectorType, validate } from 'shared/utils/validate';
import { byIdSchema } from 'shared/schemas/byIdSchema';
import { addEvent, addEventSchema } from './_controllers/addEvent';
import { deleteEventById } from './_controllers/deleteEventById';
import { getEventById } from './_controllers/getEventById';
import { location } from './location';

export const events = Router();

events.use(authMiddleware);
events.use('/location', location);

events.post('/addEvent', validate(addEventSchema), asyncErrorHandler(addEvent));
events.post(
  '/deleteEventById',
  validate(byIdSchema, SelectorType.Query),
  asyncErrorHandler(deleteEventById),
);
events.get(
  '/getEventById',
  validate(byIdSchema, SelectorType.Query),
  asyncErrorHandler(getEventById),
);
