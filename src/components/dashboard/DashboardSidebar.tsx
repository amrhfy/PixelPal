"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  RiDashboardLine,
  RiProjectorLine,
  RiTeamLine,
  RiMessage3Line,
  RiWalletLine,
  RiSettings4Line,
  RiSearchLine
} from 'react-icons/ri';

const freelancerLinks = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: RiDashboardLine
  },
  {
    title: 'Find Work',
    href: '/dashboard/find-work',
    icon: RiSearchLine
  },
  {
    title: 'My Projects',
    href: '/dashboard/projects',
    icon: RiProjectorLine
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: RiMessage3Line
  },
  {
    title: 'Earnings',
    href: '/dashboard/earnings',
    icon: RiWalletLine
  }
];

const clientLinks = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: RiDashboardLine
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: RiProjectorLine
  },
  {
    title: 'Find Talent',
    href: '/dashboard/find-talent',
    icon: RiTeamLine
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: RiMessage3Line
  },
  {
    title: 'Billing',
    href: '/dashboard/billing',
    icon: RiWalletLine
  }
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const links = user?.role === 'FREELANCER' ? freelancerLinks : clientLinks;

  return (
    <div className="w-64 border-r border-border bg-card hidden md:block">
      <div className="flex flex-col h-full">
        <div className="space-y-1 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/50 transition-colors",
                    pathname === link.href 
                      ? "bg-accent/50 text-accent-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-border p-4">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/50 transition-colors",
              pathname === '/settings'
                ? "bg-accent/50 text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <RiSettings4Line className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
} 
