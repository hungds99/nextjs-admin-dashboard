import { z } from 'zod';

export const companySchema = z.object({
  id: z.string(),
  name: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  overview: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  potential_type: z.number(),
  address: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  country: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  email_domain: z.string(),
  phone: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  matching_criteria: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  facebook_url: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  linkedin_url: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  logo_path: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  origin_logo_url: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  website: z
    .string()
    .nullable()
    .transform((value) => value ?? ''),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().optional().nullable(),
});

export type Company = z.infer<typeof companySchema>;
