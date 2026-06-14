import { useQuery } from '@tanstack/react-query';
import type { CompanyFormData } from '../schemas/company.schema';

export function useCompanyList() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await fetch('/api/companies');
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      const json = await response.json();
      return json.data as (CompanyFormData & { id: string })[];
    },
  });
}
