import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InvoiceTable } from '@/features/invoice/components/invoice-table';

export const metadata = {
  title: 'Invoices - Invoice Builder',
};

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage your invoices.
          </p>
        </div>
        <Link href="/dashboard/invoices/new" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Create Invoice
        </Link>
      </div>

      <div className="rounded-md border bg-card">
        <InvoiceTable />
      </div>
    </div>
  );
}
