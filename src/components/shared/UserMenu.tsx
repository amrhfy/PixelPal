"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  RiDashboardLine,
  RiUserLine,
  RiLogoutBoxRLine,
  RiArrowDownSLine,
} from 'react-icons/ri';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    await logout();
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: RiDashboardLine,
      href: user.role === 'ADMIN' ? '/admin' : '/dashboard',
    },
    {
      label: 'Profile',
      icon: RiUserLine,
      href: '/profile',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-accent/50 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
          {user.name[0].toUpperCase()}
        </div>

        {/* Name & Arrow (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
          <RiArrowDownSLine 
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-64 py-2 rounded-lg border bg-background shadow-lg z-40"
            >
              {/* User Info */}
              <div className="px-3 pb-2 mb-2 border-b">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
              </div>

              {/* Menu Items */}
              <div className="px-1.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 mx-0.5 px-2.5 py-2 text-sm rounded-md hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}

                {/* Sign Out Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full mx-0.5 px-2.5 py-2 text-sm rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <RiLogoutBoxRLine className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 
