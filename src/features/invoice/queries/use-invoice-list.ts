import { useQuery } from '@tanstack/react-query';

export function useInvoiceList(companyId: string | null) {
  return useQuery({
    queryKey: ['invoices', companyId],
    queryFn: async () => {
      if (!companyId) return [];
      const response = await fetch(`/api/invoices?companyId=${companyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const json = await response.json();
      return json.data;
    },
    enabled: !!companyId,
  });
}
