import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

async function getUser() {
  try {
    const headersList = headers();
    const cookieHeader = headersList.get('cookie');
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) return null;

    const decoded = verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
    return await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
  } catch {
    return null;
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status } = await request.json();
    
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 
