import { supabase } from './supabase';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  deadline: string;
  creator_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  deadline?: string;
}

/**
 * Get all projects for the current user
 */
export async function getProjects(): Promise<Project[]> {
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('Error getting current user:', userError);
    return [];
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('creator_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get a single project by ID (only if user is the creator)
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('Error getting current user:', userError);
    return null;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('creator_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return data;
}

/**
 * Create a new project
 */
export async function createProject(projectData: CreateProjectInput): Promise<Project> {
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User must be authenticated to create a project');
  }

  const { data, error } = await supabase
    .from('projects')
    .insert({
      title: projectData.title,
      description: projectData.description,
      deadline: projectData.deadline || new Date().toISOString(),
      creator_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data;
}

/**
 * Update an existing project (only if user is the creator)
 */
export async function updateProject(
  projectId: string,
  updates: Partial<CreateProjectInput>
): Promise<Project> {
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User must be authenticated to update a project');
  }

  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId)
    .eq('creator_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data;
}

/**
 * Delete a project (only if user is the creator)
 */
export async function deleteProject(projectId: string): Promise<void> {
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User must be authenticated to delete a project');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('creator_id', user.id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}
