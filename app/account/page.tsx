"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, LogOut } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { getOrCreateDeviceId, linkDeviceToUser } from "@/lib/supabase/device";
import { signInWithGoogle, signOut, getSession, onAuthStateChange } from "@/lib/supabase/auth";

export default function AccountPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });
    const unsubscribe = onAuthStateChange(async (s) => {
      setSession(s);
      if (s?.user) {
        const deviceId = getOrCreateDeviceId();
        await linkDeviceToUser(deviceId, s.user.id);
      }
    });
    return unsubscribe;
  }, []);

  const handleGoogleSignIn = () => {
    signInWithGoogle(`${window.location.origin}/account`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#14171f] px-6 text-[#e8d9b0]">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-xs text-[#e8d9b0]/40 hover:text-[#e8d9b0]/70">
          ← Menu
        </Link>

        <div className="mt-8 text-center">
          <h1 className="text-2xl font-semibold">
            {session ? "Signed in" : "Sign in"}
          </h1>
          <p className="mt-2 text-sm text-[#e8d9b0]/50">
            Sync your progress across devices. Not required to play.
          </p>
        </div>

        {!loading && !session && (
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 rounded-xl border border-[#e8d9b0]/15 bg-[#1a1d27] px-5 py-3.5 text-sm font-medium text-[#e8d9b0]/80 transition hover:bg-[#1a1d27]/70"
            >
              <GoogleGlyph />
              Continue with Google
            </button>

            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-3 rounded-xl border border-[#e8d9b0]/15 bg-[#1a1d27] px-5 py-3.5 text-sm font-medium text-[#e8d9b0]/80 opacity-70"
            >
              <Mail size={18} />
              Continue with Email
            </button>
          </div>
        )}

        {!loading && session && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => signOut()}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#e8d9b0]/15 bg-[#1a1d27] px-5 py-3.5 text-sm font-medium text-[#e8d9b0]/80 transition hover:bg-[#1a1d27]/70"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[#e8d9b0]/30">
          {session ? "" : "Email sign-in isn't wired up yet — placeholder only."}
        </p>

        <div className="mt-8 rounded-xl border border-[#e8d9b0]/10 bg-[#1a1d27] px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#e8d9b0]/40">
            Currently playing as
          </p>
          <p className="mt-1 text-sm text-[#e8d9b0]/70">
            {session?.user?.email ?? "Guest (this device only)"}
          </p>
        </div>
      </div>
    </main>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.42 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
