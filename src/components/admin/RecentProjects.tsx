"use client";

import Link from 'next/link';
import { Project, User } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

interface RecentProjectsProps {
  projects: (Project & {
    owner: User;
    freelancer: User | null;
  })[];
}

function formatDate(date: Date): string {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return new Date(date).toLocaleDateString();
  }
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div className="divide-y divide-border">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/admin/projects/${project.id}`}
          className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            {project.title[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{project.title}</p>
            <p className="text-sm text-muted-foreground truncate">
              by {project.owner.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {formatDate(project.createdAt)}
            </p>
            <p className={`text-xs ${
              project.status === 'OPEN'
                ? 'text-blue-500'
                : project.status === 'IN_PROGRESS'
                ? 'text-green-500'
                : project.status === 'COMPLETED'
                ? 'text-purple-500'
                : 'text-red-500'
            }`}>
              {project.status}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
} 
