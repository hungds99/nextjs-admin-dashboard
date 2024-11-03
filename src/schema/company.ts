import { z } from 'zod';

export const companySchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  overview: z.string().nullable(),
  potential_type: z.number(),
  address: z.string().nullable(),
  country: z.string().nullable(),
  email_domain: z.string(),
  phone: z.string().nullable(),
  matching_criteria: z.string().nullable(),
  facebook_url: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  logo_path: z.string().nullable(),
  origin_logo_url: z.string().nullable(),
  website: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
});

export type Company = z.infer<typeof companySchema>;
