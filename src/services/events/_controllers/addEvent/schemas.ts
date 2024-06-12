import { z } from 'zod';
import { EventType } from 'shared/dto/EventType';
import { coordsSchema } from 'shared/schemas/coordsSchema';
import { expiredDateStringSchema } from 'shared/schemas/dateStringSchema';

export const addEventSchema = z.object({
  title: z.string().min(4).max(30),
  eventType: z.nativeEnum(EventType),
  coords: coordsSchema,
  eventDate: expiredDateStringSchema,
  lang: z.optional(z.string()).or(z.null()),
  description: z.optional(z.string().min(6).max(500)).or(z.null()),
});
