"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ErrorAlert from '@/components/shared/ErrorAlert';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
        >
          Welcome back
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-muted-foreground mt-2"
        >
          Enter your credentials to access your account
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="secondary"
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/10 to-[#4285F4]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-3">
              <FaGoogle className="w-5 h-5 text-[#4285F4]" />
              <span>Google</span>
            </div>
          </Button>
          <Button 
            variant="secondary"
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#333]/10 to-[#333]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-3">
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </div>
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background/50 backdrop-blur-xl px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <ErrorAlert message={error} />}
          
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            required
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-border" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <Link 
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            rightIcon={<BsArrowRight />}
          >
            Sign in
          </Button>
        </form>
      </motion.div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link 
          href="/register"
          className="text-primary hover:underline"
        >
          Create one now
        </Link>
      </p>
    </div>
  );
} 
