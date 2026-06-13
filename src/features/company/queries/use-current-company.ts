import { useQuery } from '@tanstack/react-query';
import type { CompanyFormData } from '../schemas/company.schema';

export function useCurrentCompany() {
  return useQuery({
    queryKey: ['company', 'me'],
    queryFn: async () => {
      const response = await fetch('/api/companies/me');
      if (!response.ok) {
        throw new Error('Failed to fetch company profile');
      }
      const json = await response.json();
      return json.data as CompanyFormData | null;
    },
  });
}
