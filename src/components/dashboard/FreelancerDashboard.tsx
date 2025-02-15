"use client";

import { motion } from 'framer-motion';
import { RiProjectorLine, RiBriefcaseLine, RiWalletLine, RiSendPlaneLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';

export default function FreelancerDashboard() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's an overview of your freelancing activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <RiProjectorLine className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <h3 className="text-2xl font-semibold">3</h3>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <RiSendPlaneLine className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Proposals Sent</p>
                <h3 className="text-2xl font-semibold">12</h3>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <RiMoneyDollarCircleLine className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Earnings</p>
                <h3 className="text-2xl font-semibold">$2,450</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Earnings Overview</h2>
            </div>
            <div className="p-6">
              <DashboardChart />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
            </div>
            <div className="divide-y divide-border">
              {/* Recent projects list */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
