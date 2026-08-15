import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Doesn't throw at import time so a misconfigured build doesn't crash
  // the whole app — callers will see failed requests instead, logged
  // clearly, until the env vars are set.
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase calls will fail."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
