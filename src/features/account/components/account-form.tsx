'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

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
import { accountSchema, type AccountFormData } from '../schemas/account.schema';
import { useCurrentAccount } from '../queries/use-current-account';
import { useUpdateAccount } from '../mutations/use-update-account';
import { Skeleton } from '@/components/ui/skeleton';

export function AccountForm() {
  const { data: account, isLoading } = useCurrentAccount();
  const updateMutation = useUpdateAccount();

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      displayName: '',
      avatarUrl: '',
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({
        displayName: account.displayName || '',
        avatarUrl: account.avatarUrl || '',
      });
    }
  }, [account, form]);

  async function onSubmit(data: AccountFormData) {
    updateMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Account profile updated');
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
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.jpg" {...field} />
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
