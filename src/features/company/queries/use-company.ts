import { useQuery } from '@tanstack/react-query';
import type { CompanyFormData } from '../schemas/company.schema';

export function useCompany(companyId: string) {
  return useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => {
      // Just fetch all and filter, or we could add a new endpoint.
      // Given we already have useCompanyList, we can fetch from the list endpoint.
      // Wait, we don't have GET /api/companies/[id], so fetching all and filtering is easy, or we can make the endpoint.
      // I'll make the GET /api/companies/[id] endpoint for completeness.
      const response = await fetch(`/api/companies/${companyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch company');
      }
      const json = await response.json();
      return json.data as (CompanyFormData & { id: string });
    },
    enabled: !!companyId,
  });
}
