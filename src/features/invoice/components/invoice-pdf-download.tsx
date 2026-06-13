'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { InvoicePDFDocument } from './invoice-pdf-document';
import { Download } from 'lucide-react';

interface Props {
  invoice: any;
  company: any;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  isMenuItem?: boolean;
}

export function InvoicePdfDownload({ invoice, company, variant = 'default', className, isMenuItem }: Props) {
  if (!invoice || !company) return null;

  return (
    <PDFDownloadLink
      document={<InvoicePDFDocument invoice={invoice} company={company} />}
      fileName={`invoice-${invoice.invoiceNumber}.pdf`}
      className={isMenuItem ? 'flex items-center w-full' : ''}
    >
      {({ loading }) => {
        if (isMenuItem) {
          return (
            <>
              <Download className="mr-2 h-4 w-4" />
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </>
          );
        }

        return (
          <Button variant={variant} className={className} disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
}
