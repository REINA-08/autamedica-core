import { createClient } from '@supabase/supabase-js';
import type { AuthUser, UserRole } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  async signIn(email: string, password?: string) {
    if (password) {
      // Email + password sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } else {
      // Magic link sign in
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { data, error };
    }
  },

  async signUp(email: string, password: string, userData: Partial<AuthUser>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          role: userData.role || 'patient',
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession();
    return { data, error };
  },
};

// User profile helpers
export const userProfile = {
  async get(userId: string): Promise<{ data: AuthUser | null; error: any }> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return { data, error };
  },

  async update(userId: string, updates: Partial<AuthUser>) {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  async getByRole(role: UserRole) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', role)
      .eq('is_active', true);

    return { data, error };
  },
};

// Patient-specific helpers
export const patientService = {
  async get(userId: string) {
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        user:users(*)
      `)
      .eq('user_id', userId)
      .single();

    return { data, error };
  },

  async update(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('patients')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    return { data, error };
  },

  async getAppointments(patientId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        doctor:doctors(
          *,
          user:users(name, avatar_url)
        )
      `)
      .eq('patient_id', patientId)
      .order('scheduled_at', { ascending: true });

    return { data, error };
  },
};

// Doctor-specific helpers
export const doctorService = {
  async get(userId: string) {
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        *,
        user:users(*)
      `)
      .eq('user_id', userId)
      .single();

    return { data, error };
  },

  async update(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('doctors')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    return { data, error };
  },

  async getAvailable() {
    const { data, error } = await supabase
      .from('doctor_public_info')
      .select('*')
      .eq('is_available', true);

    return { data, error };
  },

  async getAppointments(doctorId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(
          *,
          user:users(name, avatar_url)
        )
      `)
      .eq('doctor_id', doctorId)
      .order('scheduled_at', { ascending: true });

    return { data, error };
  },
};

// Appointment helpers
export const appointmentService = {
  async create(appointment: any) {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        ...appointment,
        video_room_id: `room_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      })
      .select()
      .single();

    return { data, error };
  },

  async update(appointmentId: string, updates: any) {
    const { data, error } = await supabase
      .from('appointments')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', appointmentId)
      .select()
      .single();

    return { data, error };
  },

  async getUpcoming() {
    const { data, error } = await supabase
      .from('upcoming_appointments')
      .select('*')
      .limit(10);

    return { data, error };
  },
};

// Real-time subscriptions
export const subscriptions = {
  appointments(callback: (payload: any) => void) {
    return supabase
      .channel('appointments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
        },
        callback
      )
      .subscribe();
  },

  userProfile(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user_${userId}_changes`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },
};