import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import AdminStats from '@/components/admin/AdminStats';
import RecentUsers from '@/components/admin/RecentUsers';
import RecentProjects from '@/components/admin/RecentProjects';
import { dynamic } from '@/app/config';

export const revalidate = 60; // Revalidate every 60 seconds

async function getAdminData() {
  // Use a single query to get all stats
  const [
    { users, totalUsers, activeUsers },
    { projects, totalProjects, activeProjects }
  ] = await Promise.all([
    prisma.$transaction(async (tx) => {
      const [users, totalUsers, activeUsers] = await Promise.all([
        tx.user.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            profile: {
              select: {
                avatar: true,
                bio: true
              }
            }
          }
        }),
        tx.user.count(),
        tx.user.count({ where: { status: 'ACTIVE' } })
      ]);
      return { users, totalUsers, activeUsers };
    }),
    prisma.$transaction(async (tx) => {
      const [projects, totalProjects, activeProjects] = await Promise.all([
        tx.project.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            freelancer: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }),
        tx.project.count(),
        tx.project.count({ where: { status: 'IN_PROGRESS' } })
      ]);
      return { projects, totalProjects, activeProjects };
    })
  ]);

  return {
    users,
    projects,
    stats: {
      totalUsers,
      activeUsers,
      totalProjects,
      activeProjects
    }
  };
}

export default async function AdminDashboard() {
  const { users, projects, stats } = await getAdminData();

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to the admin dashboard. Monitor and manage your platform here.
          </p>
        </div>

        <AdminStats stats={stats} />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Recent Users</h2>
            </div>
            <RecentUsers users={users} />
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
            </div>
            <RecentProjects projects={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { dynamic }; 
