'use client';

import { useInvoiceList } from '../queries/use-invoice-list';
import { useDeleteInvoice } from '../mutations/use-delete-invoice';
import { useCompany } from '@/features/company/queries/use-company';
import { formatCurrency } from '@/lib/formatters/currency';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { MoreHorizontal, Eye, Edit, Download, Trash } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InvoicePdfDownload } from './invoice-pdf-download';

import { useCompanyStore } from '@/features/company/store/use-company-store';

export function InvoiceTable() {
  const selectedCompanyId = useCompanyStore((state) => state.selectedCompanyId);
  const { data: invoices, isLoading } = useInvoiceList(selectedCompanyId);
  const { data: company, isLoading: isLoadingCompany } = useCompany(selectedCompanyId || '');
  const deleteMutation = useDeleteInvoice();

  if (isLoading || isLoadingCompany) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-8 w-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!invoices || invoices.length === 0) {
    return <div className="text-muted-foreground py-6 text-center">No invoices found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice #</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv: any) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
            <TableCell>{inv.clientName}</TableCell>
            <TableCell>{new Date(inv.dueDate).toLocaleDateString()}</TableCell>
            <TableCell>{formatCurrency(inv.totalAmount)}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem render={<Link href={`/dashboard/invoices/${inv.id}`} />}>
                    <Eye className="mr-2 h-4 w-4" />
                    Detail
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href={`/dashboard/invoices/${inv.id}/edit`} />}>
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<div className="w-full cursor-pointer text-left" />}>
                    <InvoicePdfDownload invoice={inv} company={company} isMenuItem={true} />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<div className="w-full cursor-pointer text-left" />}
                    className="group text-destructive focus:bg-destructive hover:bg-destructive hover:!text-white focus:!text-white"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this invoice?')) {
                        deleteMutation.mutate(inv.id, {
                          onSuccess: () => toast.success('Invoice deleted'),
                          onError: () => toast.error('Failed to delete invoice'),
                        });
                      }
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4 transition-colors" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
