import { z } from 'zod';

export const dateStringSchema = z.string().refine(val => {
  const date = new Date(val);

  return !Number.isNaN(date.getTime());
}, { message: 'Invalid date format' });

export const expiredDateStringSchema = z.string().refine(val => {
  const date = new Date(val);
  const currDate = new Date();

  return !Number.isNaN(date.getTime()) && currDate < date;
});
