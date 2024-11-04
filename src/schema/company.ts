import { z } from 'zod';

export const companySchema = z.object({
  id: z.string(),
  name: z.string().optional().default(''),
  overview: z.string().optional().default(''),
  potential_type: z.number(),
  address: z.string().optional().default(''),
  country: z.string().optional().default(''),
  email_domain: z.string(),
  phone: z.string().optional().default(''),
  matching_criteria: z.string().optional().default(''),
  facebook_url: z.string().optional().default(''),
  linkedin_url: z.string().optional().default(''),
  logo_path: z.string().optional().default(''),
  origin_logo_url: z.string().optional().default(''),
  website: z.string().optional().default(''),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().optional().nullable(),
});

export type Company = z.infer<typeof companySchema>;
