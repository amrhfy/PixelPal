"use client";

import { motion } from 'framer-motion';
import { RiRocketLine } from 'react-icons/ri';

export default function Logo() {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="flex items-center cursor-pointer relative z-50"
    >
      <div className="relative">
        <RiRocketLine className="w-8 h-8 text-primary" />
        <motion.div
          className="absolute -inset-2 bg-primary/10 rounded-xl blur-xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <span className="font-bold text-xl bg-gradient-to-r from-primary-dark via-primary to-primary-light bg-clip-text text-transparent ml-3">
        PixelPal
      </span>
    </motion.div>
  );
}
