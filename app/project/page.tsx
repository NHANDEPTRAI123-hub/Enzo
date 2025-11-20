"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import CreateProjectModal from "@/components/Project/CreateProjectModal";
import type { User } from "@supabase/supabase-js";

export default function ProjectPage() {
  const [, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCreateProject = async (projectData: {
    name: string;
    description: string;
    deadline?: string;
    assignees?: string[];
  }) => {
    // TODO: Implement project creation logic with Supabase
    console.log("Creating project:", projectData);
    // You can add Supabase insert logic here later
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
          {/* Create Button - Top Right */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2)] px-4 sm:px-6 py-2 sm:py-3 bg-feature-card-purple-dark hover:bg-feature-card-purple-dark/90 text-white rounded-xl transition-all flex items-center gap-1 sm:gap-1"
            >
              <p>Create</p>
              <Image
                src="/ui/project/plus.svg"
                alt="Create"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          </div>
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
