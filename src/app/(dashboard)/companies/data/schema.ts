import { z, ZodEnum } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.string().url(),
  email: z.string().email(),
  role: z.string(),
  status: ZodEnum.create(['active', 'inactive']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
