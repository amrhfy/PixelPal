import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Suspense } from 'react';

async function getUser() {
  try {
    const headersList = await headers();
    const cookieHeader = await headersList.get('cookie');
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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
} 
