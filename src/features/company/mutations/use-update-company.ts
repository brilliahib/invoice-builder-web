import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CompanyFormData } from '../schemas/company.schema';

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompanyFormData) => {
      const response = await fetch('/api/companies/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update company profile');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company', 'me'] });
    },
  });
}
