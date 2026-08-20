"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";
import { inkwellAndIvySharedChapters, inkwellAndIvyRouteChapters, getInkwellAndIvyChapter } from "@/lib/stories/inkwell-and-ivy/chapters";
import { inkwellAndIvyManifest } from "@/lib/stories/inkwell-and-ivy/manifest";
import { getOrCreateDeviceId, ensurePlayer } from "@/lib/supabase/device";
import { getUnlockedChapters, getLastReadChapter, getProgress } from "@/lib/supabase/progress";
import { getSession, onAuthStateChange } from "@/lib/supabase/auth";

type LoadState = "loading" | "ready";

export default function InkwellAndIvyChapterPicker() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [unlocked, setUnlocked] = useState<Set<number>>(new Set([1]));
  const [lastRead, setLastRead] = useState<number | null>(null);
  // Route the player locked into at Ch.11 — undefined until they've saved
  // progress past the route split. Chapters 12+ only exist once this is set.
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const deviceId = getOrCreateDeviceId();
      const session = await getSession();
      const userId = session?.user?.id ?? null;
      await ensurePlayer(deviceId, userId);
      const [unlockedChapters, last, progress] = await Promise.all([
        getUnlockedChapters(deviceId, inkwellAndIvyManifest.slug, userId),
        getLastReadChapter(deviceId, inkwellAndIvyManifest.slug, userId),
        getProgress(deviceId, inkwellAndIvyManifest.slug, userId),
      ]);
      if (cancelled) return;
      setUnlocked(unlockedChapters);
      setLastRead(last);
      setRoute(progress?.route ?? null);
      setLoadState("ready");
    };
    load();
    // Re-run the same load whenever sign-in state changes (e.g. user signs
    // in on another tab and comes back), so unlocks/progress from other
    // devices show up without a manual refresh.
    const unsubscribe = onAuthStateChange(() => {
      setLoadState("loading");
      load();
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  // Shared chapters (1-11) always show. Route chapters (12+) only show once
  // the player has an actual locked route, so a fresh player never sees a
  // Kai/Ren chapter list before Ch.11 resolves it for them.
  const writtenChapterNumbers = [
    ...Object.keys(inkwellAndIvySharedChapters).map(Number),
    ...(route && inkwellAndIvyRouteChapters[route]
      ? Object.keys(inkwellAndIvyRouteChapters[route]).map(Number)
      : []),
  ].sort((a, b) => a - b);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#14171f] px-6 py-12 text-[#e8d9b0]">
      <div className="w-full max-w-md">
        <Link href="/stories" className="inline-flex items-center gap-1.5 text-xs text-[#e8d9b0]/40 hover:text-[#e8d9b0]/70">
          <ArrowLeft size={14} /> All stories
        </Link>

        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#e8d9b0]/50">
          {inkwellAndIvyManifest.title}
        </p>
        <h1 className="mt-1 text-2xl font-semibold">Chapters</h1>

        {loadState === "ready" && lastRead && getInkwellAndIvyChapter(lastRead, route) && (
          <Link
            href={`/play/inkwell-and-ivy/${lastRead}`}
            className="mt-4 block rounded-xl border border-[#caa14d]/50 bg-[#1f2330] px-5 py-3 text-sm font-medium text-[#e8d9b0] hover:border-[#caa14d]"
          >
            Continue — Chapter {lastRead}
          </Link>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {writtenChapterNumbers.map((num) => {
            const chapter = getInkwellAndIvyChapter(num, route);
            if (!chapter) return null;
            const isUnlocked = loadState === "ready" && unlocked.has(num);
            return (
              <div
                key={num}
                className={`rounded-2xl border px-5 py-4 ${
                  isUnlocked
                    ? "border-[#caa14d]/40 bg-[#1f2330]"
                    : "border-[#e8d9b0]/10 bg-[#1a1d27] opacity-60"
                }`}
              >
                <p className="text-xs uppercase tracking-wide text-[#e8d9b0]/50">
                  Chapter {num}
                </p>
                <p className="font-semibold">{chapter.title}</p>
                {isUnlocked ? (
                  <Link
                    href={`/play/inkwell-and-ivy/${num}`}
                    className="mt-3 inline-block rounded-lg bg-[#caa14d] px-4 py-2 text-sm font-medium text-[#14171f]"
                  >
                    {num === lastRead ? "Continue" : "Read"}
                  </Link>
                ) : (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-[#e8d9b0]/40">
                    <Lock size={12} /> Locked — finish Chapter {num - 1} to unlock
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {writtenChapterNumbers.length < inkwellAndIvyManifest.totalChapters && (
          <p className="mt-6 text-center text-xs text-[#e8d9b0]/30">
            More chapters coming soon.
          </p>
        )}
      </div>
    </main>
  );
}
