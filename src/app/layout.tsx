import type { Metadata } from 'next';

import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';

const haskoy = localFont({
  src: '../../public/fonts/haskoy.ttf',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Invoice Builder | Create Professional Invoices',
  description:
    'Invoice Builder is a free tool for creating and managing professional invoices. Create, send, and track invoices with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('h-full', 'antialiased', 'font-sans', haskoy.variable)}>
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
