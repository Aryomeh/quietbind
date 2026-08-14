import type { StoryCharacter } from "@/lib/engine/types";

interface AffectionHudProps {
  characters: StoryCharacter[];
  affection: Record<string, number>;
  /** Affection value that renders as a full bar, for a sane 0-100-ish scale until real ranges are tuned. */
  max?: number;
}

export function AffectionHud({ characters, affection, max = 100 }: AffectionHudProps) {
  const loveInterests = characters.filter((c) => c.isLoveInterest);
  if (loveInterests.length === 0) return null;

  return (
    <div className="flex w-full flex-wrap gap-3">
      {loveInterests.map((character) => {
        const value = affection[character.id] ?? 0;
        const pct = Math.max(0, Math.min(100, (value / max) * 100));
        return (
          <div key={character.id} className="flex-1 min-w-[120px]">
            <div className="mb-1 flex items-center justify-between text-xs text-[#e8d9b0]">
              <span className="font-medium">{character.name}</span>
              <span className="tabular-nums text-[#e8d9b0]/70">{value}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#3a3122]">
              <div
                className="h-full rounded-full bg-[#caa14d] transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
