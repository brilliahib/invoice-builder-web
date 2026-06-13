'use client';

import { use } from 'react';
import { useInvoice } from '@/features/invoice/queries/use-invoice';
import { useCurrentCompany } from '@/features/company/queries/use-current-company';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InvoicePdfDownload } from '@/features/invoice/components/invoice-pdf-download';
import { formatCurrency } from '@/lib/formatters/currency';

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: invoice, isLoading, error } = useInvoice(resolvedParams.id);
  const { data: company } = useCurrentCompany();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error || !invoice) {
    return <div className="text-destructive">Failed to load invoice or it does not exist.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoice {invoice.invoiceNumber}</h1>
        <div className="flex items-center space-x-2">
          <InvoicePdfDownload invoice={invoice} company={company} variant="outline" />
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              {company?.logoUrl ? (
                <img src={company.logoUrl} alt="Company Logo" className="h-16 mb-4 object-contain" />
              ) : (
                <h2 className="text-2xl font-bold mb-4">{company?.name || 'Your Company'}</h2>
              )}
              <p className="text-muted-foreground whitespace-pre-wrap">{company?.address}</p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold mb-2">INVOICE</h3>
              <p className="text-muted-foreground">#{invoice.invoiceNumber}</p>
              <p className="text-muted-foreground">Date: {new Date(invoice.createdAt).toLocaleDateString()}</p>
              <p className="text-muted-foreground">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold mb-2">Bill To:</h4>
            <p className="font-medium">{invoice.clientName}</p>
            <p className="text-muted-foreground whitespace-pre-wrap">{invoice.clientAddress}</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.lineItems.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6">
            <div className="w-1/3">
              <div className="flex justify-between items-center text-xl font-bold mt-4 pt-4 border-t">
                <span>Total</span>
                <span>{formatCurrency(invoice.totalAmount)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 pt-8 border-t">
              <h4 className="font-semibold mb-2">Notes</h4>
              <p className="text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
