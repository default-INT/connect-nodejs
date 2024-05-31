import { Router } from 'express';
import { asyncErrorHandler } from 'shared/utils/asyncErrorHandler';
import { SelectorType, validate } from 'shared/utils/validate';
import { getByCoordinates, getByCoordinatesSchema } from './_controllers/getByCoordinates';

export const location = Router();

location.get(
  '/getByCoordinates',
  validate(getByCoordinatesSchema, SelectorType.Query),
  asyncErrorHandler(getByCoordinates),
);
