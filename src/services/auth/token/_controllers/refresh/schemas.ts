import { z } from 'zod';

export const refreshSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  accessExpiredAt: z.string(),
  refreshExpiredAt: z.string(),
});
