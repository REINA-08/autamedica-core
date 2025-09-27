// Core types for Autamedica platform

export type UserRole = 'patient' | 'doctor' | 'company_admin' | 'platform_admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  date_of_birth: string;
  phone: string;
  address: string;
  emergency_contact: string;
  medical_history?: string;
}

export interface Doctor {
  id: string;
  user_id: string;
  specialties: string[];
  license_number: string;
  years_experience: number;
  consultation_fee: number;
  availability: Record<string, string[]>;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  scheduled_at: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'follow_up' | 'emergency';
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  employees_count: number;
  industry: string;
}