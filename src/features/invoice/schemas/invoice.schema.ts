import { z } from 'zod';

export const lineItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.coerce.number().min(0, 'Unit price must be >= 0'),
});

export const invoiceSchema = z.object({
  id: z.string().optional(),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientAddress: z.string().optional(),
  dueDate: z.date({
    required_error: 'Due date is required',
  }),
  notes: z.string().optional(),
  status: z.enum(['DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
  lineItems: z.array(lineItemSchema).min(1, 'At least one line item is required'),
});

export type LineItemFormData = z.infer<typeof lineItemSchema>;
export type InvoiceFormData = z.infer<typeof invoiceSchema>;
