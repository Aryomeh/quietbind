import type { CharacterId, Emotion, StoryCharacter } from "@/lib/engine/types";
import { characterArtPath, hasCharacterArt } from "@/lib/engine/characterArt";

interface CharacterStageProps {
  storySlug: string;
  speaker: CharacterId | "narrator";
  emotion?: Emotion;
  characters: StoryCharacter[];
}

const EMOTION_LABEL: Record<string, string> = {
  neutral: "Neutral",
  happy: "Happy",
  sad: "Sad",
  surprised: "Surprised",
  annoyed: "Annoyed",
  blushing: "Blushing",
  serious: "Serious",
};

/**
 * Character portrait slot above the dialogue box. Renders the real art
 * once it exists at public/assets/stories/<slug>/characters/<id>/<emotion>.png
 * and is registered in lib/engine/characterArt.ts; until then shows a
 * placeholder card (initial + name + emotion tag) so chapters can be
 * written and tested with the right speaker/emotion cues before any art
 * is sourced. Narrator lines render no portrait.
 */
export function CharacterStage({
  storySlug,
  speaker,
  emotion = "neutral",
  characters,
}: CharacterStageProps) {
  if (speaker === "narrator") return null;

  const character = characters.find((c) => c.id === speaker);
  const name = character?.name ?? speaker;

  if (hasCharacterArt(storySlug, speaker, emotion)) {
    return (
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={characterArtPath(storySlug, speaker, emotion)}
          alt={`${name} — ${emotion}`}
          className="h-56 w-auto object-contain drop-shadow-xl"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex h-40 w-32 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#caa14d]/30 bg-[#1f2330] text-center">
        <span className="text-2xl font-semibold text-[#caa14d]">
          {name.charAt(0).toUpperCase()}
        </span>
        <span className="max-w-[90%] truncate text-[10px] uppercase tracking-wide text-[#e8d9b0]/40">
          {name}
        </span>
        <span className="text-[10px] text-[#e8d9b0]/30">
          {EMOTION_LABEL[emotion] ?? emotion}
        </span>
      </div>
    </div>
  );
}
