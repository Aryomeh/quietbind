import type { DialogueLine } from "@/lib/engine/types";
import type { StoryCharacter } from "@/lib/engine/types";

interface DialogueBoxProps {
  line: DialogueLine;
  characters: StoryCharacter[];
  onAdvance: () => void;
}

export function DialogueBox({ line, characters, onAdvance }: DialogueBoxProps) {
  const speakerName =
    line.speaker === "narrator"
      ? null
      : characters.find((c) => c.id === line.speaker)?.name ?? line.speaker;

  return (
    <button
      onClick={onAdvance}
      className="w-full rounded-2xl border border-[#caa14d]/30 bg-[#f6ecd6] px-6 py-5 text-left shadow-lg transition hover:border-[#caa14d]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#caa14d]"
    >
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
      <p className="mt-3 text-right text-xs text-[#a9762f]/70">tap to continue</p>
    </button>
  );
}
