import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AccountFormData } from '../schemas/account.schema';

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AccountFormData) => {
      const response = await fetch('/api/accounts/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update account');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account', 'me'] });
    },
  });
}
