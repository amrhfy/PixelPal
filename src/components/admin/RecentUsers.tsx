"use client";

import Link from 'next/link';
import { User, Profile } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

interface RecentUsersProps {
  users: (User & {
    profile: Profile | null;
  })[];
}

function formatDate(date: Date): string {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return new Date(date).toLocaleDateString();
  }
}

export default function RecentUsers({ users }: RecentUsersProps) {
  return (
    <div className="divide-y divide-border">
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/admin/users/${user.id}`}
          className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {formatDate(user.createdAt)}
            </p>
            <p className="text-xs text-green-500">ACTIVE</p>
          </div>
        </Link>
      ))}
    </div>
  );
} 
