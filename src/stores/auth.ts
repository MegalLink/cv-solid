import create from 'solid-zustand';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

// Store the subscription at module level to ensure it's only created once
let authSubscription: { unsubscribe: () => void } | null = null;

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: { message: string } }>;
  signOut: () => Promise<void>;

  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  loading: false,


  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { error };
      }
      
      set({
        session: data.session,
        user: data.user,
        loading: false,
      });
      
      return {};
    } catch (error) {
      return { error: error as Error };
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clean up the subscription when signing out
      if (authSubscription) {
        authSubscription.unsubscribe();
        authSubscription = null;
      }
      
      set({
        session: null,
        user: null,
      });
    } finally {
      set({ loading: false });
    }
  },

  refreshSession: async (): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      set({
        session: data.session,
        user: data.session?.user ?? null,
      });
    } catch (error) {
      console.error('Error refreshing session:', error);
      throw error;
    }
  },

  initialize: async () => {
    const state = get();
    
    // If already initializing, don't start another initialization
    if (state.loading) {
      console.log('Auth initialization already in progress');
      return () => {};
    }
    
    console.log('Initializing auth...');
    set({ loading: true });
    
    try {
      // First, try to refresh the session
      await get().refreshSession();
      
      // Set up the auth state change listener if it doesn't exist
      if (!authSubscription) {
        console.log('Setting up auth state change listener');
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event);
            set({
              session,
              user: session?.user ?? null,
              loading: false,
            });
          }
        );
        authSubscription = subscription;
      }
      
      // Mark as initialized
      set({ 
        loading: false 
      });
      
      console.log('Auth initialization complete');
      
      // Return a cleanup function
      return () => {
        console.log('Cleaning up auth subscription');
        if (authSubscription) {
          authSubscription.unsubscribe();
          authSubscription = null;
        }
      };
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ loading: false });
      throw error;
    }
  },
}));
