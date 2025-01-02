"use client";

import { motion } from 'framer-motion';
import { HiOutlineUsers, HiOutlineBriefcase, HiOutlineCash } from 'react-icons/hi';

const stats = [
  {
    icon: HiOutlineUsers,
    value: "50K+",
    label: "Developers",
    delay: 0.2
  },
  {
    icon: HiOutlineBriefcase,
    value: "100K+",
    label: "Projects",
    delay: 0.4
  },
  {
    icon: HiOutlineCash,
    value: "$10M+",
    label: "Paid Out",
    delay: 0.6
  }
];

export default function StatsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl transform transition-transform group-hover:scale-105" />
          <div className="relative p-6 flex flex-col items-center text-center">
            <stat.icon className="w-8 h-8 text-primary mb-4" />
            <span className="text-3xl font-bold text-foreground mb-1">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 
