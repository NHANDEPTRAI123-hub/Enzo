'use client';

import React from 'react';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  onSelect?: (projectId: string) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = new Date(project.deadline) < new Date();

  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 ring-1 ring-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelect?.(project.id)}
    >
      {/* Project Icon */}
      <div className="w-12 h-12 bg-feature-card-purple rounded-lg mb-4 flex items-center justify-center">
        <svg 
          className="w-6 h-6 text-feature-card-purple-dark" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </div>

      {/* Project Title */}
      <h3 className="text-lg font-semibold text-text-black mb-2 line-clamp-1">
        {project.title}
      </h3>

      {/* Project Description */}
      <p className="text-sm text-text-gray mb-4 line-clamp-2 min-h-10">
        {project.description || 'No description provided'}
      </p>

      {/* Deadline */}
      <div className="flex items-center gap-2 mb-4">
        <svg 
          className="w-4 h-4 text-text-gray" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <span className={`text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-text-gray'}`}>
          {isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(project.deadline)}
        </span>
      </div>

      {/* Action Button */}
      <button 
        className="w-full py-2 px-4 bg-feature-card-purple-dark text-white rounded-lg hover:bg-feature-card-purple-dark/90 transition-colors text-sm font-medium"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(project.id);
        }}
      >
        Open Project
      </button>
    </div>
  );
}
