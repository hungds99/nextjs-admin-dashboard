import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  phone: z.string().nullable(),
  email: z.string().email(),
  address: z.string().nullable(),
  avatar: z.string().nullable(),
  company: z.string().nullable(),
  position: z.string().nullable(),
  website: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
});

export type User = z.infer<typeof userSchema>;
