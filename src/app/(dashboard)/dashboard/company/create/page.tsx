import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyForm } from '@/features/company/components/company-form';

export const metadata = {
  title: 'Create Company - Invoice Builder',
};

export default function CreateCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Company</h1>
        <p className="text-muted-foreground">
          Add a new company profile to use on your invoices.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>
            Fill in your company information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyForm />
        </CardContent>
      </Card>
    </div>
  );
}
