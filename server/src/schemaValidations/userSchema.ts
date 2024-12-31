import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: 'Password Must be at least 6 characters' }),
  firstName: z.string().min(2, { message: 'First Name is Required' }),
  lastName: z.string().min(2, { message: 'Last Name is Required' }),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: 'Password Must be at least 4 characters' }),
});
