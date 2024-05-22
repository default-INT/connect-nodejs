import { Router } from 'express';
import { getByCoordinates } from './_controllers/getByCoordinates';

export const location = Router();

location.get('/getByCoordinates', getByCoordinates);
