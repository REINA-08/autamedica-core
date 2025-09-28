// Auth types for Autamedica platform

export type UserRole = 'patient' | 'doctor' | 'company_admin' | 'platform_admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_record_number?: string;
  insurance_provider?: string;
  insurance_number?: string;
  allergies?: string[];
  chronic_conditions?: string[];
}

export interface Doctor {
  id: string;
  user_id: string;
  license_number: string;
  specialties: string[];
  years_experience: number;
  consultation_fee?: number;
  education?: string[];
  certifications?: string[];
  languages: string[];
  timezone: string;
  is_verified: boolean;
  is_available: boolean;
}

export interface Company {
  id: string;
  name: string;
  tax_id: string;
  email: string;
  phone?: string;
  address?: string;
  industry?: string;
  employees_count: number;
  contact_person_name?: string;
  contact_person_email?: string;
  is_active: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  patient?: Patient | null;
  doctor?: Doctor | null;
  company?: Company | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<AuthUser>) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
  refreshUser: () => Promise<void>;
}