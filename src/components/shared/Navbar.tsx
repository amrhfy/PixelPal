"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Button from './Button';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const navLinks = [
  { href: '/find-work', label: 'Find Work', role: 'FREELANCER' },
  { href: '/hire-talent', label: 'Hire Talent', role: 'CLIENT' },
  { href: '/community', label: 'Community', role: null },
  { href: '/about', label: 'About', role: null },
];

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();

  console.log('Navbar state:', { user, isLoading });
  console.log("Current user state:", user);

  const filteredLinks = navLinks.filter(link => 
    !link.role || (user && link.role === user.role)
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 h-16"
    >
      <nav className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {filteredLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-24 h-8 bg-muted animate-pulse rounded-lg" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
} 
