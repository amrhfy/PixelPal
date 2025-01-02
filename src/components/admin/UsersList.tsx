"use client";

import { useState } from 'react';
import { User, Profile, UserStatus } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearchLine, RiEditLine, RiDeleteBinLine, RiFilterLine } from 'react-icons/ri';
import { formatDistanceToNow } from 'date-fns';
import Button from '@/components/shared/Button';
import EditUserModal from './EditUserModal';
import { cn } from '@/lib/utils';

interface UsersListProps {
  users: (User & {
    profile: Profile | null;
  })[];
}

export default function UsersList({ users: initialUsers }: UsersListProps) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'ALL' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = async (userId: string, status: UserStatus) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to update user');

      const updatedUser = await response.json();
      setUsers(users.map(user => 
        user.id === userId ? { ...user, ...updatedUser } : user
      ));
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'SUSPENDED':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button className="shrink-0 opacity-50 cursor-not-allowed" disabled>
          Add New User
        </Button>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="FREELANCER">Freelancer</option>
          <option value="CLIENT">Client</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group rounded-lg border border-border bg-background p-6 hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingUser(user)}
                    disabled={isLoading}
                  >
                    <RiEditLine className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                    disabled={isLoading}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <RiDeleteBinLine className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                    {user.role}
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium border",
                    getStatusColor(user.status)
                  )}>
                    {user.status}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(updatedUser) => {
            setUsers(users.map(u => 
              u.id === updatedUser.id ? { ...u, ...updatedUser } : u
            ));
            setEditingUser(null);
          }}
        />
      )}
    </motion.div>
  );
} 
