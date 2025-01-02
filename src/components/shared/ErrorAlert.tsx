"use client";

import { motion } from 'framer-motion';
import { RiErrorWarningLine } from 'react-icons/ri';

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
    >
      <RiErrorWarningLine className="w-5 h-5 flex-shrink-0 text-red-500" />
      <p className="text-sm font-medium text-red-600 dark:text-red-400">
        {message}
      </p>
    </motion.div>
  );
} 
