import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';
import { getPrisma } from '@/server/infrastructure/prisma/prisma-client';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = getPrisma();

  // Find all companies for the user
  const companies = await prisma.company.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json({ data: companies });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const prisma = getPrisma();

  const created = await prisma.company.create({
    data: {
      name: body.name,
      address: body.address,
      contactNumber: body.contactNumber,
      signatoryName: body.signatoryName,
      signatoryTitle: body.signatoryTitle,
      logoUrl: body.logoUrl,
      signatureUrl: body.signatureUrl,
      userId: session.id,
    },
  });

  return NextResponse.json({ data: created }, { status: 201 });
}
