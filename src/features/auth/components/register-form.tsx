'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
import { createClient } from '@/lib/supabase/client';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      companyName: '',
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);

    // Register user with Supabase
    const { error: signUpError, data: authData } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          company_name: data.companyName,
        },
      },
    });

    if (signUpError) {
      toast.error(signUpError.message);
      setIsLoading(false);
      return;
    }

    // Usually Supabase requires email confirmation depending on settings.
    // If not required, we can redirect to dashboard.
    // However, we also need to create a Company record and Account record.
    // In our architecture, we can do this via a backend API call right after sign up,
    // or via a Supabase database trigger on auth.users insert.
    // For now, let's assume a backend API endpoint `/api/auth/setup` will be called
    // or the database trigger handles it.
    // Assuming database trigger is best for consistency as per Supabase patterns.

    toast.success('Registration successful. Please check your email to verify.');
    setIsLoading(false);

    // In local dev without email verification, it auto-logs in:
    if (authData.session) {
      router.push('/dashboard');
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </Form>
  );
}
