"use client";

import { useState } from 'react';
import { User, Profile, UserStatus } from '@prisma/client';
import { RiMoreLine } from 'react-icons/ri';
import { formatDistanceToNow } from 'date-fns';

interface UsersListProps {
  users: (User & {
    profile: Profile | null;
  })[];
}

export default function UsersList({ users }: UsersListProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const updateUserStatus = async (userId: string, status: UserStatus) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!res.ok) throw new Error('Failed to update user');
      
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Name</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Email</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Role</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Joined</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    {user.profile?.location && (
                      <div className="text-sm text-muted-foreground">{user.profile.location}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-700'
                    : user.status === 'SUSPENDED'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="relative">
                  <button
                    onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <RiMoreLine className="w-5 h-5" />
                  </button>
                  
                  {selectedUser === user.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg z-10">
                      {user.status !== 'ACTIVE' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'ACTIVE')}
                          className="w-full px-4 py-2 text-sm text-left hover:bg-accent transition-colors text-green-600"
                        >
                          Activate User
                        </button>
                      )}
                      {user.status !== 'SUSPENDED' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'SUSPENDED')}
                          className="w-full px-4 py-2 text-sm text-left hover:bg-accent transition-colors text-red-600"
                        >
                          Suspend User
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
