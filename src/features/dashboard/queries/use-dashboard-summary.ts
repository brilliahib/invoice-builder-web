import { useQuery } from '@tanstack/react-query';

interface DashboardSummary {
  totalInvoices: number;
  totalAmount: number;
  activeClients: number;
  recentInvoices: any[]; // will refine later
  monthlyRevenue: { name: string; total: number }[];
  kpi: {
    revenuePercentage: number;
    clientsPercentage: number;
    invoicesPercentage: number;
  };
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/summary');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard summary');
      }
      const json = await response.json();
      return json.data as DashboardSummary;
    },
  });
}
