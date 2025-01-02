"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LoadingScreen from '@/components/shared/LoadingScreen';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'FREELANCER' | 'CLIENT';
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'FREELANCER' | 'CLIENT';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        setUser(null);
        if ((pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')) && 
            pathname !== '/login') {
          router.replace('/login');
        }
        return;
      }
      
      const { user } = await response.json();
      setUser(user);

      if (user && (pathname === '/login' || pathname === '/register')) {
        router.replace(user.role === 'ADMIN' ? '/admin' : '/dashboard');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUser(data.user);
      router.replace(data.user.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error);

      await login(data.email, data.password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {(isLoading || isAuthenticating || isLoggingOut) && (
        <LoadingScreen 
          message={
            isAuthenticating 
              ? "Authenticating..." 
              : isLoggingOut 
                ? "Signing out..." 
                : "Loading..."
          }
        />
      )}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
