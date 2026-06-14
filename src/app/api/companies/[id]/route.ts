import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';
import { getPrisma } from '@/server/infrastructure/prisma/prisma-client';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const prisma = getPrisma();

  const company = await prisma.company.findFirst({
    where: { id, userId: session.id },
  });

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  return NextResponse.json({ data: company });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const prisma = getPrisma();

  const existingCompany = await prisma.company.findFirst({
    where: { id, userId: session.id },
  });

  if (!existingCompany) {
    return NextResponse.json({ error: 'Company not found or unauthorized' }, { status: 404 });
  }

  const updated = await prisma.company.update({
    where: { id },
    data: {
      name: body.name,
      address: body.address,
      contactNumber: body.contactNumber,
      signatoryName: body.signatoryName,
      signatoryTitle: body.signatoryTitle,
      logoUrl: body.logoUrl,
      signatureUrl: body.signatureUrl,
    },
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const prisma = getPrisma();

  const existingCompany = await prisma.company.findFirst({
    where: { id, userId: session.id },
  });

  if (!existingCompany) {
    return NextResponse.json({ error: 'Company not found or unauthorized' }, { status: 404 });
  }

  await prisma.company.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
