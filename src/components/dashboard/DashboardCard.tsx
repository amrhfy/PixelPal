"use client";

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  trend: 'up' | 'down';
}

export default function DashboardCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend 
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-6 rounded-xl border border-border bg-card"
    >
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend === 'up' ? (
            <RiArrowUpLine className="w-4 h-4" />
          ) : (
            <RiArrowDownLine className="w-4 h-4" />
          )}
          {change}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </motion.div>
  );
} 
