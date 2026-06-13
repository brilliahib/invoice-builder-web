import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';
import { getPrisma } from '@/server/infrastructure/prisma/prisma-client';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = getPrisma();
  
  const account = await prisma.account.findUnique({
    where: { userId: session.id },
  });

  return NextResponse.json({ data: account });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const prisma = getPrisma();

  const account = await prisma.account.upsert({
    where: { userId: session.id },
    update: {
      displayName: body.displayName,
      avatarUrl: body.avatarUrl,
    },
    create: {
      userId: session.id,
      displayName: body.displayName,
      avatarUrl: body.avatarUrl,
    },
  });

  return NextResponse.json({ data: account });
}
