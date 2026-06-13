'use client';

import { use } from 'react';
import { InvoiceForm } from '@/features/invoice/components/invoice-form';
import { useInvoice } from '@/features/invoice/queries/use-invoice';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: invoice, isLoading, error } = useInvoice(resolvedParams.id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Invoice</h1>
          <p className="text-muted-foreground">Loading invoice data...</p>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return <div className="text-destructive">Failed to load invoice or it does not exist.</div>;
  }

  // Map to formData
  const initialData = {
    invoiceNumber: invoice.invoiceNumber,
    clientName: invoice.clientName,
    clientAddress: invoice.clientAddress,
    dueDate: new Date(invoice.dueDate),
    status: invoice.status,
    notes: invoice.notes || undefined,
    lineItems: invoice.lineItems.map((item: any) => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Invoice</h1>
        <p className="text-muted-foreground">Update your invoice details below.</p>
      </div>

      <div className="rounded-md border bg-card p-6">
        <InvoiceForm initialData={initialData} invoiceId={resolvedParams.id} />
      </div>
    </div>
  );
}
