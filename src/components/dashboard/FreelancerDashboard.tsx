"use client";

import { motion } from 'framer-motion';
import { RiProjectorLine, RiBriefcaseLine, RiWalletLine } from 'react-icons/ri';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';

export default function FreelancerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your freelancing activity.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Active Projects"
          value="3"
          change="+1"
          icon={RiProjectorLine}
          trend="up"
        />
        <DashboardCard
          title="Proposals Sent"
          value="12"
          change="+5"
          icon={RiBriefcaseLine}
          trend="up"
        />
        <DashboardCard
          title="Earnings"
          value="$2,450"
          change="+$850"
          icon={RiWalletLine}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">Earnings Overview</h2>
          <DashboardChart />
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
          {/* Add project list component */}
        </div>
      </div>
    </div>
  );
} 
