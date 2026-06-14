import { CompanyTable } from '@/features/company/components/company-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Companies - Invoice Builder',
};

export default function CompanyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage your companies to use on invoices.</p>
        </div>
        <Button render={<Link href="/dashboard/company/create" />}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Company
        </Button>
      </div>

      <div className="bg-card rounded-md border">
        <CompanyTable />
      </div>
    </div>
  );
}
