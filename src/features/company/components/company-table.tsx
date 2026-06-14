'use client';

import { useCompanyList } from '../queries/use-company-list';
import { useDeleteCompany } from '../mutations/use-delete-company';
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
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function CompanyTable() {
  const { data: companies, isLoading } = useCompanyList();
  const deleteMutation = useDeleteCompany();

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Signatory</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-10 w-10 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
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

  if (!companies || companies.length === 0) {
    return <div className="text-muted-foreground py-6 text-center">No companies found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Signatory</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell>
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="h-10 w-10 rounded-md border object-contain"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded-md border text-xs">
                  N/A
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium">{company.name}</TableCell>
            <TableCell>{company.address || '-'}</TableCell>
            <TableCell>{company.contactNumber || '-'}</TableCell>
            <TableCell>{company.signatoryName || '-'}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    render={<Link href={`/dashboard/company/${company.id}/edit`} />}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<div className="w-full cursor-pointer text-left" />}
                    className="group text-destructive focus:bg-destructive hover:bg-destructive hover:!text-white focus:!text-white"
                    onClick={() => {
                      if (
                        confirm(
                          'Are you sure you want to delete this company? It will also delete all associated invoices.',
                        )
                      ) {
                        deleteMutation.mutate(company.id, {
                          onSuccess: () => toast.success('Company deleted'),
                          onError: () => toast.error('Failed to delete company'),
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
