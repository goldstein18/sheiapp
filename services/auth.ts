import type { User } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";

export interface AuthUser {
  id: string;
  email: string | null;
}

function mapUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return { id: user.id, email: user.email ?? null };
}

export const authService = {
  async register(
    email: string,
    password: string,
    displayName?: string,
  ): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: displayName
        ? { data: { display_name: displayName } }
        : undefined,
    });
    if (error) throw error;
    if (!data.user) throw new Error("No se pudo crear el usuario");
    return data.user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (!data.user) throw new Error("No se pudo iniciar sesión");
    return data.user;
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  onAuthStateChanged(callback: (user: AuthUser | null) => void) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(mapUser(session?.user ?? null));
    });
    return () => subscription.unsubscribe();
  },
};
