import { useQuery } from '@tanstack/react-query';

export function useInvoice(id: string) {
  return useQuery({
    queryKey: ['invoices', id],
    queryFn: async () => {
      const response = await fetch(`/api/invoices/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoice');
      }
      const json = await response.json();
      return json.data;
    },
    enabled: !!id,
  });
}
