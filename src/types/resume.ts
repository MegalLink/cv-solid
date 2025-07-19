export type ResumeItemType = 'Education' | 'Work';

export interface ResumeItem {
  id: string;
  type: ResumeItemType;
  title: string;
  from_date: string; // ISO date string
  to_date: string | null; // ISO date string, null for 'present'
  place_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: any; // For flexibility with Supabase responses
}

export interface Skill {
  id: string;
  category: string;
  skill_name: string;
  created_at: string;
  updated_at: string;
  [key: string]: any; // For flexibility with Supabase responses
}

export interface ResumeData {
  experience: ResumeItem[];
  education: ResumeItem[];
  skills: Skill[];
}

export interface ResumeFormData {
  type: ResumeItemType;
  title: string;
  from_date: string;
  to_date: string;
  place_name: string;
  description: string;
}

export interface SkillFormData {
  category: string;
  skill_name: string;
}
