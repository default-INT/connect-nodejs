import { z } from 'zod';
import { EventType } from 'shared/dto/EventType';
import { coordsSchema } from 'shared/schemas/coordsSchema';
import { expiredDateStringSchema } from 'shared/schemas/dateStringSchema';

const locationSchema = z.object({
  country: z.string().min(2),
  city: z.optional(z.string().min(2)),
  address: z.optional(z.string().min(2)),
  coords: coordsSchema,
});

export const addEventSchema = z.object({
  title: z.string().min(4).max(30),
  description: z.string().min(6).max(500),
  lang: z.optional(z.string()),
  finishDate: expiredDateStringSchema,
  eventType: z.nativeEnum(EventType),
  location: locationSchema,
});
