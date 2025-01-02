"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          {/* Logo animation */}
          <div className="relative w-16 h-16 mb-8">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-primary/50"
              animate={{
                rotate: -360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 text-center"
          >
            <p className="text-lg font-medium text-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">Please wait a moment...</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 
