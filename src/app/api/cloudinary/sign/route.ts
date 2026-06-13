import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { getSession } from '@/server/infrastructure/auth/get-session';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);

    return NextResponse.json({ signature });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to sign cloudinary params' }, { status: 500 });
  }
}
