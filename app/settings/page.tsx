"use client";

import Link from "next/link";
import { useAudioSettings } from "@/lib/audio/useAudioSettings";

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#caa14d]" : "bg-[#e8d9b0]/15"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-[#f6ecd6] shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

const readingItems = ["Text speed", "Auto-advance", "Skip read text"];
const displayItems = ["Text size", "Reduce motion"];

export default function SettingsPage() {
  const { settings, setMusicEnabled, setSfxEnabled } = useAudioSettings();

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#14171f] px-6 py-12 text-[#e8d9b0]">
      <div className="w-full max-w-md">
        <Link href="/" className="text-xs text-[#e8d9b0]/40 hover:text-[#e8d9b0]/70">
          ← Menu
        </Link>
        <h1 className="mt-4 text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-[#e8d9b0]/50">
          Music and sound effects are live. Everything else below is still a placeholder.
        </p>

        <div className="mt-6 flex flex-col gap-6">
          {/* Reading — placeholder, unchanged */}
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#e8d9b0]/40">Reading</p>
            <div className="overflow-hidden rounded-2xl border border-[#e8d9b0]/10 bg-[#1a1d27]">
              {readingItems.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i !== readingItems.length - 1 ? "border-b border-[#e8d9b0]/10" : ""
                  }`}
                >
                  <span className="text-sm text-[#e8d9b0]/80">{item}</span>
                  <span className="text-xs text-[#e8d9b0]/30">—</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audio — Music and Sound Effects are real toggles now */}
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#e8d9b0]/40">Audio</p>
            <div className="overflow-hidden rounded-2xl border border-[#e8d9b0]/10 bg-[#1a1d27]">
              <div className="flex items-center justify-between border-b border-[#e8d9b0]/10 px-5 py-4">
                <span className="text-sm text-[#e8d9b0]/80">Music</span>
                <ToggleSwitch
                  checked={settings.musicEnabled}
                  onChange={setMusicEnabled}
                  label="Toggle background music"
                />
              </div>
              <div className="flex items-center justify-between border-b border-[#e8d9b0]/10 px-5 py-4">
                <span className="text-sm text-[#e8d9b0]/80">Sound Effects</span>
                <ToggleSwitch
                  checked={settings.sfxEnabled}
                  onChange={setSfxEnabled}
                  label="Toggle sound effects"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-[#e8d9b0]/80">Voice (unavailable)</span>
                <span className="text-xs text-[#e8d9b0]/30">—</span>
              </div>
            </div>
          </div>

          {/* Display — placeholder, unchanged */}
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#e8d9b0]/40">Display</p>
            <div className="overflow-hidden rounded-2xl border border-[#e8d9b0]/10 bg-[#1a1d27]">
              {displayItems.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i !== displayItems.length - 1 ? "border-b border-[#e8d9b0]/10" : ""
                  }`}
                >
                  <span className="text-sm text-[#e8d9b0]/80">{item}</span>
                  <span className="text-xs text-[#e8d9b0]/30">—</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
