"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import CreateProjectModal from "@/components/Project/CreateProjectModal";
import ProjectCard from "@/components/Project/ProjectCard";
import { createProject, getProjects, type Project } from "@/lib/projects";
import type { User } from "@supabase/supabase-js";

export default function ProjectPage() {
  const [, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser();

        if (error || !currentUser) {
          // Not authenticated, redirect to sign in
          router.push("/auth/signin");
          return;
        }

        setUser(currentUser);
        
        // Fetch projects after authentication
        await fetchProjects();
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/auth/signin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth/signin");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleCreateProject = async (projectData: {
    title: string;
    description: string;
    deadline?: string;
    assignees?: string[];
  }) => {
    try {
      await createProject({
        title: projectData.title,
        description: projectData.description,
        deadline: projectData.deadline,
      });
      
      // Refresh projects list
      await fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  const handleSelectProject = (projectId: string) => {
    // TODO: Navigate to project detail page
    console.log("Selected project:", projectId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-feature-card-purple-dark border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-gray">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar isProjectPage />
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-text-black mb-2">My Projects</h1>
              <p className="text-text-gray">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2)] px-4 sm:px-6 py-2 sm:py-3 bg-feature-card-purple-dark hover:bg-feature-card-purple-dark/90 text-white rounded-xl transition-all flex items-center gap-1 sm:gap-1"
            >
              <p className="text-sm sm:text-base">Create</p>
              <Image
                src="/ui/project/plus.svg"
                alt="Create"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          </div>

          {/* Projects Grid */}
          {isLoadingProjects ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-feature-card-purple-dark border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-gray">Loading projects...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-feature-card-purple rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 sm:w-12 sm:h-12 text-feature-card-purple-dark" 
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
                <h2 className="text-text-black mb-2">No projects yet</h2>
                <p className="text-text-gray mb-6">Get started by creating your first project</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-feature-card-purple-dark hover:bg-feature-card-purple-dark/90 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20"
                >
                  Create Your First Project
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </>
  );
}
