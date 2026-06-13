'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CldUploadWidget } from 'next-cloudinary';
import { UploadCloud } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { companySchema, type CompanyFormData } from '../schemas/company.schema';
import { useCurrentCompany } from '../queries/use-current-company';
import { useUpdateCompany } from '../mutations/use-update-company';
import { Skeleton } from '@/components/ui/skeleton';

export function CompanyForm() {
  const { data: company, isLoading } = useCurrentCompany();
  const updateMutation = useUpdateCompany();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      address: '',
      contactNumber: '',
      signatoryName: '',
      signatoryTitle: '',
      logoUrl: '',
    },
  });

  useEffect(() => {
    if (company) {
      form.reset({
        name: company.name || '',
        address: company.address || '',
        contactNumber: company.contactNumber || '',
        signatoryName: company.signatoryName || '',
        signatoryTitle: company.signatoryTitle || '',
        logoUrl: company.logoUrl || '',
        signatureUrl: company.signatureUrl || '',
      });
    }
  }, [company, form]);

  async function onSubmit(data: CompanyFormData) {
    updateMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Company profile updated');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  {field.value && (
                    <img
                      src={field.value}
                      alt="Logo"
                      className="h-16 w-16 rounded-md border object-contain"
                    />
                  )}
                  <CldUploadWidget
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result) => {
                      if (typeof result.info === 'object' && 'secure_url' in result.info) {
                        field.onChange(result.info.secure_url);
                      }
                    }}
                  >
                    {({ open }) => {
                      return (
                        <Button type="button" variant="outline" onClick={() => open()}>
                          <UploadCloud className="mr-2 h-4 w-4" />
                          Upload Logo
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Business Rd" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 234 567 890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="signatoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signatory Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signatoryTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signatory Title</FormLabel>
                <FormControl>
                  <Input placeholder="CEO" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="signatureUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signatory Signature</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  {field.value && (
                    <img
                      src={field.value}
                      alt="Signature"
                      className="h-16 w-32 rounded-md border object-contain"
                    />
                  )}
                  <CldUploadWidget
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={(result) => {
                      if (typeof result.info === 'object' && 'secure_url' in result.info) {
                        field.onChange(result.info.secure_url);
                      }
                    }}
                  >
                    {({ open }) => {
                      return (
                        <Button type="button" variant="outline" onClick={() => open()}>
                          Upload Signature
                        </Button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
