import { z } from 'zod';

export const apiNumber = z.string()
  .refine(val => {
    const number = Number(val);

    return !Number.isNaN(number);
  });
