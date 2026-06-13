import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';
import { getPrisma } from '@/server/infrastructure/prisma/prisma-client';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = getPrisma();
  
  const company = await prisma.company.findFirst({
    where: { userId: session.id },
  });

  if (!company) {
    return NextResponse.json({ data: [] });
  }

  const invoices = await prisma.invoice.findMany({
    where: { companyId: company.id },
    include: { lineItems: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: invoices });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const prisma = getPrisma();

  const company = await prisma.company.findFirst({
    where: { userId: session.id },
  });

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  // Calculate total amount
  const totalAmount = body.lineItems.reduce(
    (sum: number, item: any) => sum + item.quantity * item.unitPrice,
    0
  );

  const newInvoice = await prisma.invoice.create({
    data: {
      companyId: company.id,
      invoiceNumber: body.invoiceNumber,
      clientName: body.clientName,
      clientAddress: body.clientAddress,
      dueDate: new Date(body.dueDate),
      notes: body.notes,
      status: body.status || 'DRAFT',
      totalAmount,
      lineItems: {
        create: body.lineItems.map((item: any) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice,
        })),
      },
    },
    include: {
      lineItems: true,
    },
  });

  return NextResponse.json({ data: newInvoice }, { status: 201 });
}
