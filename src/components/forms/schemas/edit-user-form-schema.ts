import z from 'zod';

export const editUserFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters'),
});

export type EditUserFormData = z.infer<typeof editUserFormSchema>;
