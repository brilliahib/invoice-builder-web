import { useQuery } from '@tanstack/react-query';
import type { AccountFormData } from '../schemas/account.schema';

export function useCurrentAccount() {
  return useQuery({
    queryKey: ['account', 'me'],
    queryFn: async () => {
      const response = await fetch('/api/accounts/me');
      if (!response.ok) {
        throw new Error('Failed to fetch account profile');
      }
      const json = await response.json();
      return json.data as AccountFormData | null;
    },
  });
}
