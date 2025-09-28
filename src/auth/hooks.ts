import { useState, useEffect, useCallback } from 'react';
import { supabase, auth, userProfile, patientService, doctorService } from './supabase';
import type { AuthUser, AuthState } from './types';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    patient: null,
    doctor: null,
    company: null,
    loading: true,
    error: null,
  });

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: user, error: userError } = await userProfile.get(userId);
      if (userError) throw userError;

      if (!user) return;

      let patient = null;
      let doctor = null;
      let company = null;

      // Fetch role-specific data
      if (user.role === 'patient') {
        const { data: patientData } = await patientService.get(userId);
        patient = patientData;
      } else if (user.role === 'doctor') {
        const { data: doctorData } = await doctorService.get(userId);
        doctor = doctorData;
      }

      setState(prev => ({
        ...prev,
        user,
        patient,
        doctor,
        company,
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, []);

  const signIn = useCallback(async (email: string, password?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;

      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      throw error;
    }
  }, [fetchUserProfile]);

  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      const { error } = await auth.signOut();
      if (error) throw error;

      setState({
        user: null,
        patient: null,
        doctor: null,
        company: null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, userData: Partial<AuthUser>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await auth.signUp(email, password, userData);
      if (error) throw error;

      // User will need to verify email before being able to sign in
      setState(prev => ({ ...prev, loading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      throw error;
    }
  }, []);

  const sendMagicLink = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await auth.signIn(email);
      if (error) throw error;

      setState(prev => ({ ...prev, loading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<AuthUser>) => {
    if (!state.user) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await userProfile.update(state.user.id, updates);
      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: data,
        loading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      throw error;
    }
  }, [state.user]);

  const refreshUser = useCallback(async () => {
    if (!state.user) return;
    await fetchUserProfile(state.user.id);
  }, [state.user, fetchUserProfile]);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { user, error } = await auth.getUser();

        if (error) {
          console.error('Auth initialization error:', error);
          if (mounted) {
            setState(prev => ({
              ...prev,
              loading: false,
              error: error.message,
            }));
          }
          return;
        }

        if (user && mounted) {
          await fetchUserProfile(user.id);
        } else if (mounted) {
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error.message,
          }));
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            patient: null,
            doctor: null,
            company: null,
            loading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  return {
    ...state,
    signIn,
    signOut,
    signUp,
    sendMagicLink,
    updateProfile,
    refreshUser,
  };
}

// Role-based hooks
export function useRequireAuth() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      // Redirect to login
      window.location.href = '/auth/signin';
    }
  }, [auth.loading, auth.user]);

  return auth;
}

export function useRequireRole(requiredRole: string | string[]) {
  const auth = useAuth();
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  useEffect(() => {
    if (!auth.loading && auth.user && !roles.includes(auth.user.role)) {
      // Redirect to unauthorized page or home
      window.location.href = '/unauthorized';
    }
  }, [auth.loading, auth.user, roles]);

  return auth;
}

// Specific role hooks
export function usePatientAuth() {
  return useRequireRole('patient');
}

export function useDoctorAuth() {
  return useRequireRole('doctor');
}

export function useAdminAuth() {
  return useRequireRole(['company_admin', 'platform_admin']);
}