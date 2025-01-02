"use client";

import { motion } from "framer-motion";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <motion.div 
          className="h-8 w-48 bg-accent/50 rounded-lg"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="h-4 w-96 bg-accent/30 rounded-lg"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl border border-border bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="space-y-3">
              <motion.div 
                className="h-4 w-20 bg-accent/30 rounded"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.div 
                className="h-7 w-16 bg-accent/50 rounded"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Cards Skeleton */}
      <div className="grid lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-xl border border-border bg-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <div className="p-6 border-b border-border">
              <motion.div 
                className="h-5 w-32 bg-accent/50 rounded"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div className="p-6 space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex items-center gap-4">
                  <motion.div 
                    className="h-10 w-10 rounded-full bg-accent/30"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
                  />
                  <div className="space-y-2 flex-1">
                    <motion.div 
                      className="h-4 w-full max-w-[200px] bg-accent/30 rounded"
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
                    />
                    <motion.div 
                      className="h-3 w-full max-w-[160px] bg-accent/20 rounded"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
