"use client";

import { supabase } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

/** Kicks off Google OAuth. Supabase parses the returned session from the
 * URL automatically (detectSessionInUrl is on by default), so the browser
 * just lands back on redirectTo already signed in. */
export async function signInWithGoogle(redirectTo: string) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) console.error("signInWithGoogle error", error);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("signOut error", error);
}

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("getSession error", error);
    return null;
  }
  return data.session;
}

/** Subscribes to auth state changes; returns an unsubscribe function. */
export function onAuthStateChange(
  callback: (session: Session | null) => void
): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}
