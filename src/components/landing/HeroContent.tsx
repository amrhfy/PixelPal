"use client";

import { motion } from 'framer-motion';
import { BsArrowRight, BsLightning } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-lg text-sm font-medium border border-primary/10">
            <BsLightning className="w-4 h-4" />
            New Features
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent text-muted-foreground rounded-lg text-sm font-medium">
            <HiOutlineUserGroup className="w-4 h-4" />
            50k+ Users
          </span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Where{' '}
          <span className="text-transparent bg-gradient-to-r from-primary-dark via-primary to-primary-light bg-clip-text">
            talent meets
          </span>{' '}
          opportunity
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-lg">
          Join thousands of developers who have found their next opportunity through our platform. 
          Start your journey today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link href="/register">
          <Button 
            size="lg" 
            rightIcon={<BsArrowRight />}
            motionProps={{
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            Start Hiring
          </Button>
        </Link>
        <Link href="/register">
          <Button 
            size="lg" 
            variant="secondary"
            motionProps={{
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            Find Work
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>50k+ Developers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>100k+ Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>$10M+ Paid Out</span>
        </div>
      </div>
    </motion.div>
  );
} 
