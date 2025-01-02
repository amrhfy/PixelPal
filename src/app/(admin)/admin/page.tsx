import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import AdminStats from '@/components/admin/AdminStats';
import RecentUsers from '@/components/admin/RecentUsers';
import RecentProjects from '@/components/admin/RecentProjects';

async function getAdminData() {
  console.log("Fetching admin data...");

  const [users, projects] = await Promise.all([
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { profile: true }
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        owner: true,
        freelancer: true
      }
    })
  ]);

  const stats = {
    totalUsers: await prisma.user.count(),
    activeUsers: await prisma.user.count({ where: { status: 'ACTIVE' } }),
    totalProjects: await prisma.project.count(),
    activeProjects: await prisma.project.count({ where: { status: 'IN_PROGRESS' } })
  };

  console.log("Admin data fetched:", { stats, users: users.length, projects: projects.length });
  return { users, projects, stats };
}

export default async function AdminDashboard() {
  console.log("Rendering admin dashboard...");
  const { users, projects, stats } = await getAdminData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin dashboard. Monitor and manage your platform here.
        </p>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <AdminStats stats={stats} />
      </Suspense>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Recent Users</h2>
          </div>
          <Suspense fallback={<div>Loading users...</div>}>
            <RecentUsers users={users} />
          </Suspense>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Recent Projects</h2>
          </div>
          <Suspense fallback={<div>Loading projects...</div>}>
            <RecentProjects projects={projects} />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 
