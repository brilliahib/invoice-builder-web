import { z } from 'zod';

export const accountSchema = z.object({
  id: z.string().optional(),
  displayName: z.string().min(2, 'Name is required'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

export type AccountFormData = z.infer<typeof accountSchema>;
