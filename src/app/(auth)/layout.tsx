"use client";

import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dot-pattern p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-background" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-background/50 backdrop-blur-xl p-8 rounded-2xl border border-border/50 shadow-xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
