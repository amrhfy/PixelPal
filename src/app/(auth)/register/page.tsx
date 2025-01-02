"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsCode, BsArrowRight } from 'react-icons/bs';
import { HiOutlineBriefcase } from 'react-icons/hi';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type UserRole = 'FREELANCER' | 'CLIENT' | null;

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
      name: form.name.value,
      role: role as 'FREELANCER' | 'CLIENT'
    };

    try {
      await register(data);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold"
        >
          Create an account
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mt-2"
        >
          Choose your role and start your journey
        </motion.p>
      </div>

      {!role ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-3"
        >
          {[
            {
              role: 'FREELANCER',
              icon: BsCode,
              title: "I'm a Freelancer",
              description: "Find exciting projects and grow your career"
            },
            {
              role: 'CLIENT',
              icon: HiOutlineBriefcase,
              title: "I'm a Client",
              description: "Find talent and bring your ideas to life"
            }
          ].map((option) => (
            <motion.button
              key={option.role}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole(option.role as UserRole)}
              className="relative w-full group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative p-4 flex items-start gap-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                <div className="mt-1 p-2 rounded-lg bg-primary/5 text-primary">
                  <option.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
                    {option.title}
                    <BsArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
            >
              {error}
            </motion.div>
          )}

          <Input
            type="text"
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            required
          />
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
            placeholder="Create a password"
            required
          />

          <div className="grid gap-3 pt-2">
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              rightIcon={<BsArrowRight />}
            >
              Create Account
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setRole(null)}
            >
              ← Go back
            </Button>
          </div>
        </motion.form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link 
          href="/login"
          className="text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
} 
