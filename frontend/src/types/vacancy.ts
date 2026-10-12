export interface Vacancy {
  id: number;
  title: string;
  position: string;
  job_type: string;
  candidates_needed: number;
  active_until: string;
  formatted_active_until: string | null;
  formatted_created_at: string | null;
  location: string;
  is_remote: boolean;
  description: string;
  responsibilities?: string | null;
  requirements?: string | null;
  min_salary?: number | null;
  max_salary?: number | null;
  show_salary: boolean;
  formatted_salary?: string | null;
  min_experience: string;
  company_name: string;
  company_sector: string;
  company_size: string;
  company_logo?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VacancyInput {
  title: string;
  position: string;
  job_type: string;
  candidates_needed: number;
  active_until: string;
  location: string;
  is_remote: boolean;
  description: string;
  responsibilities?: string;
  requirements?: string;
  min_salary?: number | null;
  max_salary?: number | null;
  show_salary: boolean;
  min_experience: string;
  company_name?: string;
  company_sector?: string;
  company_size?: string;
}