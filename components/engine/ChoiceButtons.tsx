import type { ChoiceBlock } from "@/lib/engine/types";
import { audioManager } from "@/lib/audio/AudioManager";
import { SFX } from "@/lib/audio/assets";

interface ChoiceButtonsProps {
  choice: ChoiceBlock;
  onChoose: (optionId: string) => void;
}

export function ChoiceButtons({ choice, onChoose }: ChoiceButtonsProps) {
  function handleChoose(optionId: string) {
    audioManager.playSfx(SFX.choiceSelect);
    onChoose(optionId);
  }

  return (
    <div className="w-full rounded-2xl border border-[#caa14d]/30 bg-[#f6ecd6] px-6 py-5 shadow-lg">
      {choice.prompt && (
        <p className="mb-3 text-sm font-medium text-[#5b5138]">{choice.prompt}</p>
      )}
      <div className="flex flex-col gap-2">
        {choice.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleChoose(option.id)}
            className="rounded-lg border border-[#caa14d]/50 bg-[#fffaf0] px-4 py-3 text-left text-[#241d12] transition hover:border-[#caa14d] hover:bg-[#f0e2be] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#caa14d]"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
