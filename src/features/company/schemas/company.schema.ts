import { z } from 'zod';

export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Company name is required'),
  address: z.string().optional(),
  contactNumber: z.string().optional(),
  signatoryName: z.string().optional(),
  signatoryTitle: z.string().optional(),
  logoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  signatureUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export type CompanyFormData = z.infer<typeof companySchema>;
