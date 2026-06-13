import { InvoiceForm } from '@/features/invoice/components/invoice-form';

export const metadata = {
  title: 'New Invoice - Invoice Builder',
};

export default function NewInvoicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Invoice</h1>
        <p className="text-muted-foreground">Fill out the details below to create a new invoice.</p>
      </div>

      <div className="bg-card rounded-md border p-6">
        <InvoiceForm />
      </div>
    </div>
  );
}
