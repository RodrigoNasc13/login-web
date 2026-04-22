import z from 'zod';

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters'),
  email: z
    .email('Invalid email address')
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character',
    ),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
