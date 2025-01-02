"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  RiDashboardLine, 
  RiProjectorLine,
  RiBriefcaseLine,
  RiTeamLine,
  RiMessage3Line,
  RiWalletLine,
  RiSettings4Line
} from 'react-icons/ri';

const freelancerLinks = [
  { href: '/dashboard', label: 'Overview', icon: RiDashboardLine },
  { href: '/dashboard/projects', label: 'My Projects', icon: RiProjectorLine },
  { href: '/dashboard/proposals', label: 'Proposals', icon: RiBriefcaseLine },
  { href: '/dashboard/messages', label: 'Messages', icon: RiMessage3Line },
  { href: '/dashboard/earnings', label: 'Earnings', icon: RiWalletLine },
];

const clientLinks = [
  { href: '/dashboard', label: 'Overview', icon: RiDashboardLine },
  { href: '/dashboard/projects', label: 'Projects', icon: RiProjectorLine },
  { href: '/dashboard/talent', label: 'Find Talent', icon: RiTeamLine },
  { href: '/dashboard/messages', label: 'Messages', icon: RiMessage3Line },
  { href: '/dashboard/billing', label: 'Billing', icon: RiWalletLine },
];

export default function DashboardSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  
  const links = user?.role === 'FREELANCER' ? freelancerLinks : clientLinks;

  return (
    <aside className="w-64 border-r border-border bg-muted/30">
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}

        <div className="my-4 border-t border-border" />

        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            pathname === '/dashboard/settings'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          <RiSettings4Line className="w-5 h-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
} 
