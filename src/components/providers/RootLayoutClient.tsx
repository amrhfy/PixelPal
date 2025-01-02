"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/(auth)') || pathname.startsWith('/auth');

  return (
    <AuthProvider>
      {!isAuthPage && <Navbar />}
      {children}
    </AuthProvider>
  );
} 
