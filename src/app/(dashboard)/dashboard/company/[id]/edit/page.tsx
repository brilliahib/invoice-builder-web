'use client';

import { use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyForm } from '@/features/company/components/company-form';
import { useCompany } from '@/features/company/queries/use-company';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: company, isLoading, error } = useCompany(resolvedParams.id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Company</h1>
          <p className="text-muted-foreground">Loading company data...</p>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !company) {
    return <div className="text-destructive">Failed to load company or it does not exist.</div>;
  }

  const initialData = {
    name: company.name || '',
    address: company.address || '',
    contactNumber: company.contactNumber || '',
    signatoryName: company.signatoryName || '',
    signatoryTitle: company.signatoryTitle || '',
    logoUrl: company.logoUrl || '',
    signatureUrl: company.signatureUrl || '',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Company</h1>
        <p className="text-muted-foreground">
          Update your company profile to use on your invoices.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>
            Update your company information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyForm initialData={initialData} companyId={resolvedParams.id} />
        </CardContent>
      </Card>
    </div>
  );
}
