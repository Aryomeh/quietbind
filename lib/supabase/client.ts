import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Doesn't throw at import time so a missing env var doesn't crash static
  // generation for pages that happen to pull this module in — callers will
  // see failed requests instead, logged clearly, until the env vars are set.
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase calls will fail."
  );
}

// createClient throws on an empty/invalid URL, which would still crash the
// build even with the guard above — fall back to a syntactically valid
// placeholder so construction always succeeds; real calls will just fail
// until the real env vars are set.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
