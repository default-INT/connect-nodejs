import { z } from 'zod';
import { apiNumber } from './apiNumber';

export const queryCoordsSchema = z.object({
  latitude: apiNumber,
  longitude: apiNumber,
});

export const coordsSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
