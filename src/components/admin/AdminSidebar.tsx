"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  RiDashboardLine,
  RiTeamLine,
  RiProjectorLine,
  RiSettings4Line,
  RiUserLine
} from 'react-icons/ri';

const adminLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: RiDashboardLine
  },
  {
    href: '/admin/users',
    label: 'Users',
    icon: RiTeamLine
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: RiProjectorLine
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: RiSettings4Line
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-muted/30">
      <nav className="p-4 space-y-2">
        {adminLinks.map((link) => (
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
      </nav>
    </aside>
  );
} 
