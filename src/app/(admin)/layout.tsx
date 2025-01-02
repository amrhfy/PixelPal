import { dynamic } from '@/app/config';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import * as jose from 'jose';
import prisma from '@/lib/prisma';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Suspense } from 'react';
import DashboardSkeleton from '@/components/shared/DashboardSkeleton';

export { dynamic };

async function getUser() {
  try {
    const headersList = headers();
    const cookieHeader = headersList.get('cookie');
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      console.log("No token found in admin layout");
      return null;
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    );

    const { payload } = await jose.jwtVerify(token, secret);
    const decoded = payload as unknown as { userId: string; role: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return user;
  } catch (error) {
    console.error("Error in admin layout:", error);
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 
