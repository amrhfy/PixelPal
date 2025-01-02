"use client";

import { motion } from 'framer-motion';
import HeroContent from '@/components/landing/HeroContent';
import PartnersSection from '@/components/landing/PartnersSection';

export default function Home() {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col relative overflow-hidden bg-dot-pattern">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-background" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <HeroContent />
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="mt-auto">
        <PartnersSection />
      </div>
    </div>
  );
}
