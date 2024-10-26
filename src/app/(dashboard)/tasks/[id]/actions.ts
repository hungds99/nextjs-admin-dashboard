'use server';

import { z } from 'zod';

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  language: z.string({
    required_error: 'Please select a language.',
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export async function updateUserProfile(data: AccountFormValues) {
  const validatedFields = accountFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update profile.',
    };
  }

  // Simulate API call or database update
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: 'Profile updated successfully!',
  };
}
