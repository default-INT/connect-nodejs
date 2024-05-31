import { z } from 'zod';
import { apiNumber } from './apiNumber';

export const byIdSchema = z.object({
  id: apiNumber,
});
