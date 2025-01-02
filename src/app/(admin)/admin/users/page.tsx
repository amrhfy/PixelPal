import { dynamic } from '@/app/config';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import UsersList from '@/components/admin/UsersList';

export { dynamic };

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      profile: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return users;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all users on the platform.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <Suspense fallback={<div>Loading...</div>}>
            <UsersList users={users} />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 
