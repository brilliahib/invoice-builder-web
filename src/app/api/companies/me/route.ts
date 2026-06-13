import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';
import { getPrisma } from '@/server/infrastructure/prisma/prisma-client';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = getPrisma();
  
  // Find company by user's ID
  const company = await prisma.company.findFirst({
    where: { userId: session.id },
  });

  if (!company) {
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({ data: company });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const prisma = getPrisma();

  // Find existing company
  const existingCompany = await prisma.company.findFirst({
    where: { userId: session.id },
  });

  if (existingCompany) {
    const updated = await prisma.company.update({
      where: { id: existingCompany.id },
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
  } else {
    // If not exists, create it
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
    return NextResponse.json({ data: created });
  }
}
