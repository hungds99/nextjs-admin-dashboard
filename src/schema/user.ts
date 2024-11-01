import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  phone: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  email: z.string().email(),
  address: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  avatar: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  company: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  position: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  website: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
});

export type User = z.infer<typeof userSchema>;
