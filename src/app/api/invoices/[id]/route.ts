import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';
import { getPrisma } from '@/server/infrastructure/prisma/prisma-client';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const prisma = getPrisma();

  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      company: {
        userId: session.id,
      },
    },
    include: {
      lineItems: true,
    },
  });

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found or unauthorized' }, { status: 404 });
  }

  return NextResponse.json({ data: invoice });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const prisma = getPrisma();

  // Verify ownership
  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      company: {
        userId: session.id,
      },
    },
  });

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found or unauthorized' }, { status: 404 });
  }

  await prisma.invoice.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const prisma = getPrisma();

  // Verify ownership
  const existingInvoice = await prisma.invoice.findFirst({
    where: {
      id,
      company: {
        userId: session.id,
      },
    },
  });

  if (!existingInvoice) {
    return NextResponse.json({ error: 'Invoice not found or unauthorized' }, { status: 404 });
  }

  const totalAmount = body.lineItems.reduce(
    (sum: number, item: any) => sum + item.quantity * item.unitPrice,
    0,
  );

  // Update invoice and replace line items
  const updatedInvoice = await prisma.invoice.update({
    where: { id },
    data: {
      invoiceNumber: body.invoiceNumber,
      clientName: body.clientName,
      clientAddress: body.clientAddress,
      dueDate: new Date(body.dueDate),
      notes: body.notes,
      status: body.status,
      totalAmount,
      lineItems: {
        deleteMany: {}, // Delete old items
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

  return NextResponse.json({ data: updatedInvoice });
}
