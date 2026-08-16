import type { DialogueLine } from "@/lib/engine/types";
import type { StoryCharacter } from "@/lib/engine/types";

interface DialogueBoxProps {
  line: DialogueLine;
  characters: StoryCharacter[];
  onAdvance: () => void;
  /** Grow to fill the available space — used for narrator lines with no character portrait above, so the card doesn't leave a large empty gap. */
  fill?: boolean;
}

export function DialogueBox({ line, characters, onAdvance, fill = false }: DialogueBoxProps) {
  const speakerName =
    line.speaker === "narrator"
      ? null
      : characters.find((c) => c.id === line.speaker)?.name ?? line.speaker;

  return (
    <button
      onClick={onAdvance}
      className={`w-full rounded-2xl border border-[#caa14d]/30 bg-[#f6ecd6] px-6 py-5 text-left shadow-lg transition hover:border-[#caa14d]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#caa14d] ${
        fill ? "flex flex-1 flex-col justify-between" : ""
      }`}
    >
      <div>
        {speakerName && (
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#a9762f]">
            {speakerName}
          </p>
        )}
        <p
          className={`leading-relaxed text-[#241d12] ${
            line.speaker === "narrator" ? "italic text-[#5b5138]" : ""
          }`}
        >
          {line.text}
        </p>
      </div>
      <p className="mt-3 text-right text-xs text-[#a9762f]/70">tap to continue</p>
    </button>
  );
}
