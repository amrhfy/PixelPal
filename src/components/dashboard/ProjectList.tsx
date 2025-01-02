"use client";

import { motion } from 'framer-motion';
import { RiArrowRightLine } from 'react-icons/ri';

const projects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    status: "In Progress",
    dueDate: "2024-04-15",
    progress: 65
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    status: "In Progress",
    dueDate: "2024-03-30",
    progress: 40
  },
  {
    id: 3,
    title: "Marketing Dashboard",
    status: "In Review",
    dueDate: "2024-03-25",
    progress: 90
  }
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

export default function ProjectList() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          whileHover={{ x: 2 }}
          className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer group"
        >
          <div>
            <h3 className="font-medium group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-muted-foreground">
                Due {formatDate(project.dueDate)}
              </span>
              <span className="text-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {project.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-24">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            <RiArrowRightLine className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  );
} 
