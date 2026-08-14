"use client";

import type { Chapter, StoryCharacter } from "@/lib/engine/types";
import { useChapterPlayer } from "@/lib/engine/player";
import { DialogueBox } from "@/components/engine/DialogueBox";
import { ChoiceButtons } from "@/components/engine/ChoiceButtons";
import { AffectionHud } from "@/components/engine/AffectionHud";

interface ChapterPlayerProps {
  chapter: Chapter;
  characters: StoryCharacter[];
  initialAffection?: Record<string, number>;
}

export function ChapterPlayer({ chapter, characters, initialAffection }: ChapterPlayerProps) {
  const { currentNode, affection, isComplete, advance, choose } = useChapterPlayer(
    chapter,
    initialAffection
  );

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

        {isComplete && (
          <div className="rounded-2xl border border-[#caa14d]/30 bg-[#f6ecd6] px-6 py-8 text-center shadow-lg">
            <p className="font-semibold text-[#241d12]">End of chapter.</p>
          </div>
        )}

        {currentNode?.type === "dialogue" && (
          <DialogueBox line={currentNode} characters={characters} onAdvance={advance} />
        )}

        {currentNode?.type === "choice" && (
          <ChoiceButtons choice={currentNode} onChoose={choose} />
        )}
      </div>
    </div>
  );
}
