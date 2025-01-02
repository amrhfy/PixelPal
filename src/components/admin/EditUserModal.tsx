"use client";

import { useState } from 'react';
import { User, Profile } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiUserLine, RiMailLine, RiMapPinLine, RiGlobalLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';

interface EditUserModalProps {
  user: User & { profile: Profile | null };
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    profile: {
      bio: user.profile?.bio || '',
      skills: user.profile?.skills || '',
      hourlyRate: user.profile?.hourlyRate || 0,
      location: user.profile?.location || '',
      website: user.profile?.website || ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update user');

      const updatedUser = await response.json();
      onSave(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Overlay for clicking outside to close */}
        <div 
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-background/95 backdrop-blur-md relative rounded-lg shadow-lg max-w-2xl w-full overflow-hidden border border-border/50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-muted/50">
            <div>
              <h2 className="text-xl font-semibold">Edit User Profile</h2>
              <p className="text-sm text-muted-foreground mt-1">Update user information and settings</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <RiCloseLine className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex gap-4 p-4">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'basic'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Basic Info
              </button>
              {user.role !== 'ADMIN' && (
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Profile Details
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {activeTab === 'basic' ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <div className="relative">
                        <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <div className="relative">
                        <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="CLIENT">Client</option>
                        <option value="FREELANCER">Freelancer</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="PENDING">Pending</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      value={formData.profile.bio}
                      onChange={(e) => setFormData({
                        ...formData,
                        profile: { ...formData.profile, bio: e.target.value }
                      })}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {user.role === 'FREELANCER' && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Skills</label>
                        <input
                          type="text"
                          value={formData.profile.skills}
                          onChange={(e) => setFormData({
                            ...formData,
                            profile: { ...formData.profile, skills: e.target.value }
                          })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="e.g., React, Node.js, TypeScript"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Hourly Rate</label>
                        <div className="relative">
                          <RiMoneyDollarCircleLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="number"
                            value={formData.profile.hourlyRate}
                            onChange={(e) => setFormData({
                              ...formData,
                              profile: { ...formData.profile, hourlyRate: parseFloat(e.target.value) }
                            })}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <div className="relative">
                        <RiMapPinLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.profile.location}
                          onChange={(e) => setFormData({
                            ...formData,
                            profile: { ...formData.profile, location: e.target.value }
                          })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Website</label>
                      <div className="relative">
                        <RiGlobalLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="url"
                          value={formData.profile.website}
                          onChange={(e) => setFormData({
                            ...formData,
                            profile: { ...formData.profile, website: e.target.value }
                          })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 
