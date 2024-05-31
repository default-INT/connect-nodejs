import { z } from 'zod';

export const googleSignInSchema = z.object({
  idToken: z.string(),
});
