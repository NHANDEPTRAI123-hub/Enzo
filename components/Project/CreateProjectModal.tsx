'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Auth/button';
import { Input } from '@/components/Auth/input';
import { Label } from '@/components/Auth/label';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: { 
    name: string; 
    description: string;
    deadline?: string;
    assignees?: string[];
  }) => void;
}

export default function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [assignees, setAssignees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddAssignee = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
    e.preventDefault();
    
    if (assigneeEmail && !assignees.includes(assigneeEmail)) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(assigneeEmail)) {
        setAssignees([...assignees, assigneeEmail]);
        setAssigneeEmail('');
      }
    }
  };

  const removeAssignee = (emailToRemove: string) => {
    setAssignees(assignees.filter(email => email !== emailToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ 
        name: projectName, 
        description: projectDescription,
        deadline,
        assignees
      });
      setProjectName('');
      setProjectDescription('');
      setDeadline('');
      setAssignees([]);
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setProjectName('');
      setProjectDescription('');
      setDeadline('');
      setAssignees([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[500px] sm:max-w-[600px] lg:max-w-[700px] ring-1 ring-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-black font-semibold">Create New Project</h3>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 sm:py-6">
          <div className="space-y-5 sm:space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="project-name" className="text-black font-medium">
                Project Name
              </Label>
              <Input
                id="project-name"
                type="text"
                placeholder="My Awesome Project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                disabled={loading}
                className="h-11 sm:h-12 bg-white border-gray-200 focus:border-feature-card-purple-dark focus:ring-feature-card-purple-dark/20 rounded-xl transition-all"
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="project-description" className="text-black font-medium">
                Description
              </Label>
              <textarea
                id="project-description"
                placeholder="Tell us about your project..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                disabled={loading}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-feature-card-purple-dark focus:ring-2 focus:ring-feature-card-purple-dark/20 transition-all resize-none text-sm sm:text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-text-black font-medium">
                Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={loading}
                className="h-11 sm:h-12 bg-white border-gray-200 focus:border-feature-card-purple-dark focus:ring-feature-card-purple-dark/20 rounded-xl transition-all"
              />
            </div>

            {/* Assignees */}
            <div className="space-y-2">
              <Label htmlFor="assignees" className="text-text-black font-medium">
                Add Assignees
              </Label>
              <div className="flex gap-2">
                <Input
                  id="assignees"
                  type="email"
                  placeholder="colleague@example.com"
                  value={assigneeEmail}
                  onChange={(e) => setAssigneeEmail(e.target.value)}
                  onKeyDown={handleAddAssignee}
                  disabled={loading}
                  className="h-11 sm:h-12 bg-white border-gray-200 focus:border-feature-card-purple-dark focus:ring-feature-card-purple-dark/20 rounded-xl transition-all"
                />
                <Button
                  type="button"
                  onClick={handleAddAssignee}
                  disabled={loading || !assigneeEmail}
                  className="h-11 sm:h-12 px-4 bg-gray-100 hover:bg-gray-200 text-text-black rounded-xl font-medium transition-all"
                >
                  Add
                </Button>
              </div>
              
              {/* Assignee List */}
              {assignees.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {assignees.map((email) => (
                    <div 
                      key={email}
                      className="flex items-center gap-2 px-3 py-1.5 bg-feature-btn-purple text-feature-card-purple-dark rounded-lg text-sm font-medium"
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => removeAssignee(email)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="w-full sm:w-1/2 h-11 sm:h-12 border-gray-200 hover:bg-gray-50 text-text-black rounded-xl font-medium transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-1/2 h-11 sm:h-12 bg-feature-card-purple-dark hover:bg-feature-card-purple-dark/90 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
