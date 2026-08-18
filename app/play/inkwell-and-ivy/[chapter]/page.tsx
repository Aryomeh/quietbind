"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChapterPlayer } from "@/components/engine/ChapterPlayer";
import { inkwellAndIvyChapters } from "@/lib/stories/inkwell-and-ivy/chapters";
import { inkwellAndIvyManifest } from "@/lib/stories/inkwell-and-ivy/manifest";
import { getOrCreateDeviceId, ensurePlayer } from "@/lib/supabase/device";
import { isChapterUnlocked } from "@/lib/supabase/progress";
import { getSession } from "@/lib/supabase/auth";

type Status = "loading" | "locked" | "unlocked";

export default function PlayInkwellChapterPage() {
  const params = useParams<{ chapter: string }>();
  const chapterNumber = Number(params.chapter);
  const chapter = inkwellAndIvyChapters[chapterNumber];

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!chapter) return;
    let cancelled = false;
    (async () => {
      const deviceId = getOrCreateDeviceId();
      const session = await getSession();
      const userId = session?.user?.id ?? null;
      await ensurePlayer(deviceId, userId);
      const unlocked = await isChapterUnlocked(deviceId, chapter.storySlug, chapter.chapterNumber, userId);
      if (!cancelled) setStatus(unlocked ? "unlocked" : "locked");
    })();
    return () => {
      cancelled = true;
    };
  }, [chapter]);

  if (!chapter) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#14171f] px-6 text-center text-[#e8d9b0]">
        <p>That chapter doesn&apos;t exist yet.</p>
        <Link href="/" className="text-sm text-[#caa14d] underline">
          Back to stories
        </Link>
      </main>
    );
  }

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#14171f] text-[#e8d9b0]/60">
        <p>Loading…</p>
      </main>
    );
  }

  if (status === "locked") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#14171f] px-6 text-center text-[#e8d9b0]">
        <p className="text-lg font-semibold">Chapter {chapterNumber} is locked.</p>
        <p className="max-w-xs text-sm text-[#e8d9b0]/60">
          Finish the chapter before this one to unlock it.
        </p>
        <Link
          href={`/play/inkwell-and-ivy/${chapterNumber - 1}`}
          className="rounded-lg border border-[#caa14d]/50 px-4 py-2 text-sm text-[#e8d9b0] hover:border-[#caa14d]"
        >
          Go to Chapter {chapterNumber - 1}
        </Link>
      </main>
    );
  }

  return (
    <ChapterPlayer
      chapter={chapter}
      characters={inkwellAndIvyManifest.characters}
      hasNextChapter={!!inkwellAndIvyChapters[chapterNumber + 1]}
    />
  );
}
