/**
 * @autamedica/types/supabase - Tipos generados desde Supabase database schema
 * 
 * Estos tipos reflejan exactamente la estructura de la base de datos
 * y se mantienen sincronizados con el schema SQL en /database/schema.sql
 * 
 * IMPORTANTE: Este archivo se actualiza automáticamente con `supabase gen types`
 * No editar manualmente - usar los tipos de entities/ para logic business
 */

// ============================================================================
// JSON and Base Types
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ============================================================================
// Database Structure
// ============================================================================

export interface Database {
  public: {
    Tables: {
      // Profiles table (auth bridge)
      profiles: {
        Row: {
          id: string // UUID, references auth.users
          email: string
          role: 'patient' | 'doctor' | 'company_admin' | 'admin' | 'platform_admin'
          first_name: string | null
          last_name: string | null
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          id: string
          email: string
          role?: 'patient' | 'doctor' | 'company_admin' | 'admin' | 'platform_admin'
          first_name?: string | null
          last_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'patient' | 'doctor' | 'company_admin' | 'admin' | 'platform_admin'
          first_name?: string | null
          last_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // Companies table
      companies: {
        Row: {
          id: string // UUID
          owner_profile_id: string // UUID, references profiles(id)
          name: string
          tax_id: string
          industry: string | null
          size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise' | null
          address: Json | null
          contact: Json | null
          is_active: boolean
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          id?: string
          owner_profile_id: string
          name: string
          tax_id: string
          industry?: string | null
          size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise' | null
          address?: Json | null
          contact?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_profile_id?: string
          name?: string
          tax_id?: string
          industry?: string | null
          size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise' | null
          address?: Json | null
          contact?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // Doctors table
      doctors: {
        Row: {
          id: string // UUID
          user_id: string // UUID, references profiles(id)
          first_name: string
          last_name: string
          email: string
          phone: string | null
          license_number: string
          specialties: string[] // TEXT[]
          bio: string | null
          education: Json | null
          experience: Json | null
          is_active: boolean
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          license_number: string
          specialties?: string[]
          bio?: string | null
          education?: Json | null
          experience?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          license_number?: string
          specialties?: string[]
          bio?: string | null
          education?: Json | null
          experience?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // Patients table
      patients: {
        Row: {
          id: string // UUID
          user_id: string // UUID, references profiles(id)
          company_id: string | null // UUID, references companies(id)
          first_name: string
          last_name: string
          email: string
          phone: string | null
          date_of_birth: string | null // DATE
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          medical_record_number: string | null
          address: Json | null
          emergency_contact: Json | null
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          id?: string
          user_id: string
          company_id?: string | null
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          medical_record_number?: string | null
          address?: Json | null
          emergency_contact?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_id?: string | null
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
          medical_record_number?: string | null
          address?: Json | null
          emergency_contact?: Json | null
          created_at?: string
          updated_at?: string
        }
      }

      // Company Members junction table
      company_members: {
        Row: {
          company_id: string // UUID, references companies(id)
          profile_id: string // UUID, references profiles(id)
          role: 'company_admin' | 'manager' | 'staff'
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          company_id: string
          profile_id: string
          role?: 'company_admin' | 'manager' | 'staff'
          created_at?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          profile_id?: string
          role?: 'company_admin' | 'manager' | 'staff'
          created_at?: string
          updated_at?: string
        }
      }

      // Patient Care Team junction table
      patient_care_team: {
        Row: {
          patient_id: string // UUID, references patients(id)
          doctor_id: string // UUID, references doctors(id)
          relationship: string // 'primary', 'specialist', etc.
          added_by: string | null // UUID, references profiles(id)
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          patient_id: string
          doctor_id: string
          relationship?: string
          added_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          patient_id?: string
          doctor_id?: string
          relationship?: string
          added_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // Appointments table
      appointments: {
        Row: {
          id: string // UUID
          patient_id: string // UUID, references patients(id)
          doctor_id: string // UUID, references doctors(id)
          company_id: string | null // UUID, references companies(id)
          start_time: string // timestamptz
          duration_minutes: number // INTEGER, 1-480 minutes
          type: 'consultation' | 'follow-up' | 'emergency'
          status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled'
          notes: string | null
          created_by: string | null // UUID, references profiles(id)
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          company_id?: string | null
          start_time: string
          duration_minutes: number
          type?: 'consultation' | 'follow-up' | 'emergency'
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled'
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          company_id?: string | null
          start_time?: string
          duration_minutes?: number
          type?: 'consultation' | 'follow-up' | 'emergency'
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled'
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // Medical Records table
      medical_records: {
        Row: {
          id: string // UUID
          patient_id: string // UUID, references patients(id)
          doctor_id: string | null // UUID, references doctors(id)
          appointment_id: string | null // UUID, references appointments(id)
          title: string
          summary: string | null
          data: Json | null // Structured medical data
          visibility: 'patient' | 'care_team' | 'private'
          created_by: string | null // UUID, references profiles(id)
          created_at: string // timestamptz
          updated_at: string // timestamptz
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id?: string | null
          appointment_id?: string | null
          title: string
          summary?: string | null
          data?: Json | null
          visibility?: 'patient' | 'care_team' | 'private'
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string | null
          appointment_id?: string | null
          title?: string
          summary?: string | null
          data?: Json | null
          visibility?: 'patient' | 'care_team' | 'private'
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      user_role: 'patient' | 'doctor' | 'company_admin' | 'admin' | 'platform_admin'
      company_size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
      gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
      appointment_type: 'consultation' | 'follow-up' | 'emergency'
      appointment_status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled'
      medical_record_visibility: 'patient' | 'care_team' | 'private'
      company_member_role: 'company_admin' | 'manager' | 'staff'
    }

    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ============================================================================
// Helper Types for easier consumption
// ============================================================================

// Extract table types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific table types (for convenience)
export type Profile = Tables<'profiles'>
export type Company = Tables<'companies'>
export type Doctor = Tables<'doctors'>
export type Patient = Tables<'patients'>
export type CompanyMember = Tables<'company_members'>
export type PatientCareTeam = Tables<'patient_care_team'>
export type Appointment = Tables<'appointments'>
export type MedicalRecord = Tables<'medical_records'>

// Insert types
export type ProfileInsert = TablesInsert<'profiles'>
export type CompanyInsert = TablesInsert<'companies'>
export type DoctorInsert = TablesInsert<'doctors'>
export type PatientInsert = TablesInsert<'patients'>
export type CompanyMemberInsert = TablesInsert<'company_members'>
export type PatientCareTeamInsert = TablesInsert<'patient_care_team'>
export type AppointmentInsert = TablesInsert<'appointments'>
export type MedicalRecordInsert = TablesInsert<'medical_records'>

// Update types
export type ProfileUpdate = TablesUpdate<'profiles'>
export type CompanyUpdate = TablesUpdate<'companies'>
export type DoctorUpdate = TablesUpdate<'doctors'>
export type PatientUpdate = TablesUpdate<'patients'>
export type CompanyMemberUpdate = TablesUpdate<'company_members'>
export type PatientCareTeamUpdate = TablesUpdate<'patient_care_team'>
export type AppointmentUpdate = TablesUpdate<'appointments'>
export type MedicalRecordUpdate = TablesUpdate<'medical_records'>

// Enum types
export type UserRole = Database['public']['Enums']['user_role']
export type CompanySize = Database['public']['Enums']['company_size']
export type Gender = Database['public']['Enums']['gender']
export type AppointmentType = Database['public']['Enums']['appointment_type']
export type AppointmentStatus = Database['public']['Enums']['appointment_status']
export type MedicalRecordVisibility = Database['public']['Enums']['medical_record_visibility']
export type CompanyMemberRole = Database['public']['Enums']['company_member_role']

// ============================================================================
// Query Result Types (with joins)
// ============================================================================

// Doctor with profile info
export interface DoctorWithProfile extends Doctor {
  profile: Profile
}

// Patient with profile info
export interface PatientWithProfile extends Patient {
  profile: Profile
}

// Appointment with related entities
export interface AppointmentWithDetails extends Appointment {
  patient: PatientWithProfile
  doctor: DoctorWithProfile
  company?: Company | null
}

// Medical record with related entities
export interface MedicalRecordWithDetails extends MedicalRecord {
  patient: PatientWithProfile
  doctor?: DoctorWithProfile | null
  appointment?: Appointment | null
}

// Company with members
export interface CompanyWithMembers extends Company {
  members: Array<CompanyMember & { profile: Profile }>
  owner: Profile
}

// Patient care team with details
export interface PatientCareTeamWithDetails extends PatientCareTeam {
  patient: PatientWithProfile
  doctor: DoctorWithProfile
  added_by_profile?: Profile | null
}

// ============================================================================
// API Response Types
// ============================================================================

export interface SupabaseApiResponse<T> {
  data: T | null
  error: {
    message: string
    details?: string
    hint?: string
    code?: string
  } | null
}

export interface SupabasePaginatedResponse<T> {
  data: T[]
  count: number | null
  error: {
    message: string
    details?: string
    hint?: string
    code?: string
  } | null
}

// ============================================================================
// Type Guards
// ============================================================================

export function isProfile(obj: unknown): obj is Profile {
  return typeof obj === 'object' && obj !== null && 
         'id' in obj && 'email' in obj && 'role' in obj
}

export function isDoctor(obj: unknown): obj is Doctor {
  return typeof obj === 'object' && obj !== null && 
         'id' in obj && 'user_id' in obj && 'license_number' in obj
}

export function isPatient(obj: unknown): obj is Patient {
  return typeof obj === 'object' && obj !== null && 
         'id' in obj && 'user_id' in obj && 'first_name' in obj
}

export function isAppointment(obj: unknown): obj is Appointment {
  return typeof obj === 'object' && obj !== null && 
         'id' in obj && 'patient_id' in obj && 'doctor_id' in obj && 'start_time' in obj
}

// ============================================================================
// Constants
// ============================================================================

export const USER_ROLES = ['patient', 'doctor', 'company_admin', 'admin', 'platform_admin'] as const
export const COMPANY_SIZES = ['startup', 'small', 'medium', 'large', 'enterprise'] as const
export const GENDERS = ['male', 'female', 'other', 'prefer_not_to_say'] as const
export const APPOINTMENT_TYPES = ['consultation', 'follow-up', 'emergency'] as const
export const APPOINTMENT_STATUSES = ['scheduled', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'] as const
export const MEDICAL_RECORD_VISIBILITIES = ['patient', 'care_team', 'private'] as const
export const COMPANY_MEMBER_ROLES = ['company_admin', 'manager', 'staff'] as const