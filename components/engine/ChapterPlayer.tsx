"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Chapter, StoryCharacter } from "@/lib/engine/types";
import { useChapterPlayer } from "@/lib/engine/player";
import { DialogueBox } from "@/components/engine/DialogueBox";
import { ChoiceButtons } from "@/components/engine/ChoiceButtons";
import { AffectionHud } from "@/components/engine/AffectionHud";
import { AdGateModal } from "@/components/engine/AdGateModal";
import { getOrCreateDeviceId, ensurePlayer } from "@/lib/supabase/device";
import { saveProgress, unlockChapter } from "@/lib/supabase/progress";

interface ChapterPlayerProps {
  chapter: Chapter;
  characters: StoryCharacter[];
  initialAffection?: Record<string, number>;
  /** Whether chapterNumber + 1 exists as written content — controls the "Continue" link after the ad. */
  hasNextChapter?: boolean;
}

export function ChapterPlayer({
  chapter,
  characters,
  initialAffection,
  hasNextChapter = false,
}: ChapterPlayerProps) {
  const { currentNode, affection, flags, isComplete, advance, choose } = useChapterPlayer(
    chapter,
    initialAffection
  );

  // idle -> showing (ad pops on completion) -> done (ad dismissed, progress saved, next chapter unlocked)
  const [adPhase, setAdPhase] = useState<"idle" | "showing" | "done">("idle");

  useEffect(() => {
    if (isComplete && adPhase === "idle") setAdPhase("showing");
  }, [isComplete, adPhase]);

  useEffect(() => {
    if (adPhase !== "done") return;
    (async () => {
      const deviceId = getOrCreateDeviceId();
      if (!deviceId) return;
      await ensurePlayer(deviceId);
      await saveProgress(
        deviceId,
        chapter.storySlug,
        chapter.chapterNumber,
        chapter.route,
        affection,
        Array.from(flags)
      );
      await unlockChapter(deviceId, chapter.storySlug, chapter.chapterNumber + 1, "ad");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adPhase]);

  const background = currentNode?.type === "dialogue" ? currentNode.background : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-[#14171f] px-6 py-8">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8d9b0]/60">
            Chapter {chapter.chapterNumber}
          </p>
          <h1 className="text-xl font-semibold text-[#e8d9b0]">{chapter.title}</h1>
          {background && (
            <p className="mt-1 text-xs text-[#e8d9b0]/40">scene: {background}</p>
          )}
        </div>

        <AffectionHud characters={characters} affection={affection} />

        <div className="flex-1" />

        {isComplete && adPhase === "done" && (
          <div className="rounded-2xl border border-[#caa14d]/30 bg-[#f6ecd6] px-6 py-8 text-center shadow-lg">
            <p className="font-semibold text-[#241d12]">End of chapter.</p>
            {hasNextChapter ? (
              <Link
                href={`/play/${chapter.storySlug}/${chapter.chapterNumber + 1}`}
                className="mt-4 inline-block rounded-lg bg-[#241d12] px-4 py-2 text-sm font-medium text-[#f6ecd6]"
              >
                Continue to Chapter {chapter.chapterNumber + 1}
              </Link>
            ) : (
              <p className="mt-3 text-sm text-[#5b5138]">More chapters coming soon.</p>
            )}
          </div>
        )}

        {currentNode?.type === "dialogue" && (
          <DialogueBox line={currentNode} characters={characters} onAdvance={advance} />
        )}

        {currentNode?.type === "choice" && (
          <ChoiceButtons choice={currentNode} onChoose={choose} />
        )}
      </div>

      {adPhase === "showing" && <AdGateModal onComplete={() => setAdPhase("done")} />}
    </div>
  );
}
