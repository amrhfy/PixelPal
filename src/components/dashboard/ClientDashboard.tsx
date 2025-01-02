"use client";

import { motion } from 'framer-motion';
import { RiProjectorLine, RiTeamLine, RiWalletLine } from 'react-icons/ri';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import ProjectList from './ProjectList';

export default function ClientDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your projects and talent.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Active Projects"
          value="4"
          change="+2"
          icon={RiProjectorLine}
          trend="up"
        />
        <DashboardCard
          title="Hired Talent"
          value="8"
          change="+3"
          icon={RiTeamLine}
          trend="up"
        />
        <DashboardCard
          title="Total Spent"
          value="$8,750"
          change="+$1,250"
          icon={RiWalletLine}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">Spending Overview</h2>
          <DashboardChart />
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">Active Projects</h2>
          <ProjectList />
        </div>
      </div>
    </div>
  );
} 
