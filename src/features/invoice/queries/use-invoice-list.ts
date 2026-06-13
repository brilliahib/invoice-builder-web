import { useQuery } from '@tanstack/react-query';

export function useInvoiceList() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await fetch('/api/invoices');
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const json = await response.json();
      return json.data;
    },
  });
}
