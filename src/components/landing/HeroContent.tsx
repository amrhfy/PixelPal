"use client";

import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { BsArrowRight } from 'react-icons/bs';
import Image from 'next/image';

export default function HeroContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                Now in Beta
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Connect
              </span>{' '}
              with top freelancers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground"
            >
              Find the perfect match for your project needs, or showcase your skills to clients worldwide
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden opacity-50 cursor-not-allowed"
              disabled
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <span className="relative">Start Hiring</span>
              <BsArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline" 
              size="lg"
              className="group opacity-50 cursor-not-allowed"
              disabled
            >
              <span>Find Work</span>
              <BsArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-4"
          >
            <div>
              <p className="text-3xl font-bold">20k+</p>
              <p className="text-muted-foreground">Freelancers</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-bold">15k+</p>
              <p className="text-muted-foreground">Projects</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-muted-foreground">Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 
