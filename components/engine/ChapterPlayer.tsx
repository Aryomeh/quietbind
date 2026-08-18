"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Chapter, StoryCharacter } from "@/lib/engine/types";
import { useChapterPlayer } from "@/lib/engine/player";
import { resolveLockedRoute, type RouteSplitConfig } from "@/lib/engine/route";
import { DialogueBox } from "@/components/engine/DialogueBox";
import { ChoiceButtons } from "@/components/engine/ChoiceButtons";
import { AffectionHud } from "@/components/engine/AffectionHud";
import { CharacterStage } from "@/components/engine/CharacterStage";
import { AdGateModal } from "@/components/engine/AdGateModal";
import { getOrCreateDeviceId, ensurePlayer } from "@/lib/supabase/device";
import { saveProgress, unlockChapter } from "@/lib/supabase/progress";
import { getSession } from "@/lib/supabase/auth";
import { audioManager } from "@/lib/audio/AudioManager";
import { getBgmForChapter, SFX } from "@/lib/audio/assets";

interface ChapterPlayerProps {
  chapter: Chapter;
  characters: StoryCharacter[];
  initialAffection?: Record<string, number>;
  initialFlags?: string[];
  /** Whether chapterNumber + 1 exists as written content — controls the "Continue" link after the ad. */
  hasNextChapter?: boolean;
  /** This story's route-split config, if it has one — only used when
   * chapter.chapterNumber matches routeSplit.chapter. */
  routeSplit?: RouteSplitConfig;
}

export function ChapterPlayer({
  chapter,
  characters,
  initialAffection,
  initialFlags,
  hasNextChapter = false,
  routeSplit,
}: ChapterPlayerProps) {
  const { currentNode, affection, flags, isComplete, advance, choose } = useChapterPlayer(
    chapter,
    initialAffection,
    initialFlags
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
      const session = await getSession();
      const userId = session?.user?.id ?? null;
      await ensurePlayer(deviceId, userId);

      // Chapter's own `route` field is "shared" for every chapter through the
      // route lock. Once the lock chapter itself finishes, the *saved* route
      // switches to whichever character actually won — every chapter after
      // reads that saved value to pick the right route variant. Below the
      // lock chapter, the shared value is saved as-is.
      const lockedRoute =
        routeSplit && chapter.chapterNumber === routeSplit.chapter
          ? resolveLockedRoute(affection, flags, routeSplit)
          : chapter.route;

      await saveProgress(
        deviceId,
        chapter.storySlug,
        chapter.chapterNumber,
        lockedRoute,
        affection,
        Array.from(flags),
        userId
      );
      await unlockChapter(deviceId, chapter.storySlug, chapter.chapterNumber + 1, "ad", userId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adPhase]);

  const background = currentNode?.type === "dialogue" ? currentNode.background : undefined;

  useEffect(() => {
    const bgmSrc = getBgmForChapter(chapter.storySlug, chapter.chapterNumber, background);
    if (bgmSrc) {
      audioManager.playBgm(`${chapter.storySlug}:${background ?? "default"}:${chapter.chapterNumber}`, bgmSrc);
    }
  }, [background, chapter.storySlug, chapter.chapterNumber]);

  useEffect(() => {
    if (isComplete) audioManager.playSfx(SFX.chapterComplete);
  }, [isComplete]);

  useEffect(() => {
    if (adPhase === "done") audioManager.playSfx(SFX.adGateUnlock);
  }, [adPhase]);

  const isRouteSplitChapter = routeSplit && chapter.chapterNumber === routeSplit.chapter;
  const lockedRouteLabel =
    isRouteSplitChapter && isComplete
      ? characters.find((c) => c.id === resolveLockedRoute(affection, flags, routeSplit!))?.name
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#14171f] px-6 py-8">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-between gap-6">
        <div>
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-1.5 text-xs text-[#e8d9b0]/40 hover:text-[#e8d9b0]/70"
          >
            <ArrowLeft size={14} /> Menu
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-[#e8d9b0]/60">
            Chapter {chapter.chapterNumber}
          </p>
          <h1 className="text-xl font-semibold text-[#e8d9b0]">{chapter.title}</h1>
          {background && (
            <p className="mt-1 text-xs text-[#e8d9b0]/40">scene: {background}</p>
          )}
        </div>

        <AffectionHud characters={characters} affection={affection} />

        <div className="flex flex-1 flex-col justify-end gap-6">
          {isComplete && adPhase === "done" && (
            <div className="rounded-2xl border border-[#caa14d]/30 bg-[#f6ecd6] px-6 py-8 text-center shadow-lg">
              <p className="font-semibold text-[#241d12]">End of chapter.</p>
              {lockedRouteLabel && (
                <p className="mt-2 text-sm text-[#5b5138]">
                  Your path is set: <span className="font-semibold">{lockedRouteLabel}</span>
                </p>
              )}
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
            <>
              <CharacterStage
                storySlug={chapter.storySlug}
                speaker={currentNode.speaker}
                emotion={currentNode.emotion}
                characters={characters}
              />
              <DialogueBox
                line={currentNode}
                characters={characters}
                onAdvance={advance}
                fill={currentNode.speaker === "narrator"}
              />
            </>
          )}

          {currentNode?.type === "choice" && (
            <ChoiceButtons choice={currentNode} onChoose={choose} />
          )}
        </div>
      </div>

      {adPhase === "showing" && <AdGateModal onComplete={() => setAdPhase("done")} />}
    </div>
  );
}
