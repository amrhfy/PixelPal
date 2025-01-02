import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Suspense } from 'react';

async function getUser() {
  try {
    const headersList = await headers();
    const cookieHeader = await headersList.get('cookie');
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return null;
    }

    const decoded = verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
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
  } catch {
    return null;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Redirect admin users to admin dashboard
  if (user.role === 'ADMIN') {
    redirect('/admin');
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <DashboardSidebar />
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
