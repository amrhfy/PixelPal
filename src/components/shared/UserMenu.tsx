"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  RiDashboardLine, 
  RiSettings4Line, 
  RiLogoutBoxLine,
  RiUserLine,
  RiArrowDownSLine 
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

  const menuItems = [
    {
      icon: RiDashboardLine,
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      icon: RiUserLine,
      label: 'Profile',
      href: '/profile'
    },
    {
      icon: RiSettings4Line,
      label: 'Settings',
      href: '/settings'
    },
    {
      icon: RiLogoutBoxLine,
      label: 'Sign out',
      onClick: logout,
      className: 'text-red-500 hover:bg-red-50'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <RiUserLine className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium line-clamp-1">{user.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
        <RiArrowDownSLine 
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-56 py-2 bg-background rounded-xl border border-border shadow-lg z-50"
            >
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <div className="py-2">
                {menuItems.map((item) => (
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors ${item.className || ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsOpen(false);
                        item.onClick?.();
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors ${item.className || ''}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 
