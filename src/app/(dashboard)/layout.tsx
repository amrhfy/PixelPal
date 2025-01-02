import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import * as jose from 'jose';
import prisma from '@/lib/prisma';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Suspense } from 'react';

async function getUser() {
  try {
    const headersList = headers();
    const cookieHeader = headersList.get('cookie');
    const userRole = headersList.get('x-user-role'); // Get role from middleware
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      console.log("No token found in dashboard layout");
      return null;
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    );

    const { payload } = await jose.jwtVerify(token, secret);
    const decoded = payload as unknown as { userId: string; role: string };
    console.log("Token decoded in dashboard layout:", decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    console.log("User found in dashboard layout:", user);
    return user;
  } catch (error) {
    console.error("Error in dashboard layout:", error);
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

  // Redirect admin users to admin dashboard if they're accessing the main dashboard page
  if (user.role === 'ADMIN' && headers().get('x-pathname') === '/dashboard') {
    console.log("Admin user detected on main dashboard, redirecting to admin dashboard");
    redirect('/admin');
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {user.role === 'ADMIN' ? <AdminSidebar /> : <DashboardSidebar />}
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
