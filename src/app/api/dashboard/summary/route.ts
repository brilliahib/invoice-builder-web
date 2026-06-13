import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';
import { getPrisma } from '@/server/infrastructure/prisma/prisma-client';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = getPrisma();

  // The application rules state: one user belongs to one company.
  // Wait, looking at the schema:
  // Company has: userId String @map("created_by")
  // So we can find the company created by this user.
  const company = await prisma.company.findFirst({
    where: { userId: session.id },
  });

  if (!company) {
    return NextResponse.json({
      data: {
        totalInvoices: 0,
        totalAmount: 0,
        recentInvoices: [],
        monthlyRevenue: [],
      },
    });
  }

  const totalInvoices = await prisma.invoice.count({
    where: { companyId: company.id },
  });

  const invoices = await prisma.invoice.findMany({
    where: { companyId: company.id },
    select: { totalAmount: true, createdAt: true, clientName: true },
  });

  const totalAmount = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
  const activeClients = new Set(invoices.map((i) => i.clientName)).size;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  let currentMonthRevenue = 0;
  let lastMonthRevenue = 0;
  const currentMonthClients = new Set();
  const lastMonthClients = new Set();
  let currentMonthInvoicesCount = 0;
  let lastMonthInvoicesCount = 0;

  // Initialize all 12 months with 0
  const monthlyData: Record<string, number> = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  // Group by month and calculate KPIs
  invoices.forEach((inv) => {
    const d = new Date(inv.createdAt);
    const m = d.getMonth();
    const y = d.getFullYear();

    if (y === currentYear) {
      const monthStr = d.toLocaleString('en-US', { month: 'short' });
      if (monthlyData[monthStr] !== undefined) {
        monthlyData[monthStr] += Number(inv.totalAmount);
      }
    }

    if (m === currentMonth && y === currentYear) {
      currentMonthRevenue += Number(inv.totalAmount);
      currentMonthClients.add(inv.clientName);
      currentMonthInvoicesCount++;
    } else if (m === lastMonth && y === lastMonthYear) {
      lastMonthRevenue += Number(inv.totalAmount);
      lastMonthClients.add(inv.clientName);
      lastMonthInvoicesCount++;
    }
  });

  const calculatePercentage = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const kpi = {
    revenuePercentage: calculatePercentage(currentMonthRevenue, lastMonthRevenue),
    clientsPercentage: calculatePercentage(currentMonthClients.size, lastMonthClients.size),
    invoicesPercentage: calculatePercentage(currentMonthInvoicesCount, lastMonthInvoicesCount),
  };

  const monthlyRevenue = Object.keys(monthlyData).map((key) => ({
    name: key,
    total: monthlyData[key],
  }));

  const recentInvoices = await prisma.invoice.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return NextResponse.json({
    data: {
      totalInvoices,
      totalAmount,
      activeClients,
      recentInvoices,
      monthlyRevenue,
      kpi,
    },
  });
}
