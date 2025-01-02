"use client";

import { useAuth } from '@/contexts/AuthContext';
import FreelancerDashboard from '@/components/dashboard/FreelancerDashboard';
import ClientDashboard from '@/components/dashboard/ClientDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === 'FREELANCER') {
    return <FreelancerDashboard />;
  }

  return <ClientDashboard />;
} 
