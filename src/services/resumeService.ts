import { supabase } from "../lib/supabase";
import type { ResumeItem, ResumeItemType, Skill } from "../types/resume";

// Resume Items
export const getResumeItems = async (type: ResumeItemType): Promise<ResumeItem[]> => {
  const { data, error } = await supabase
    .from('resume_information')
    .select('*')
    .eq('type', type)
    .order('from_date', { ascending: false });

  if (error) {
    console.error(`Error fetching ${type.toLowerCase()} items:`, error);
    return [];
  }
  return data || [];
};

export const addResumeItem = async (item: Omit<ResumeItem, 'id' | 'created_at' | 'updated_at'>): Promise<ResumeItem | null> => {
  const { data, error } = await supabase
    .from('resume_information')
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error('Error adding resume item:', error);
    return null;
  }
  return data;
};

export const updateResumeItem = async (id: string, updates: Partial<ResumeItem>): Promise<ResumeItem | null> => {
  const { data, error } = await supabase
    .from('resume_information')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating resume item:', error);
    return null;
  }
  return data;
};

export const deleteResumeItem = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('resume_information')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting resume item:', error);
    return false;
  }
  return true;
};

// Skills
export const getSkills = async (): Promise<Skill[]> => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category')
    .order('skill_name');

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data || [];
};

export const addSkill = async (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<Skill | null> => {
  const { data, error } = await supabase
    .from('skills')
    .insert([skill])
    .select()
    .single();

  if (error) {
    console.error('Error adding skill:', error);
    return null;
  }
  return data;
};

export const updateSkill = async (id: string, updates: Partial<Skill>): Promise<Skill | null> => {
  const { data, error } = await supabase
    .from('skills')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating skill:', error);
    return null;
  }
  return data;
};

export const deleteSkill = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting skill:', error);
    return false;
  }
  return true;
};

// Get all resume data
export const getAllResumeData = async () => {
  const [experience, education, skills] = await Promise.all([
    getResumeItems('Work'),
    getResumeItems('Education'),
    getSkills(),
  ]);

  return { experience, education, skills };
};
