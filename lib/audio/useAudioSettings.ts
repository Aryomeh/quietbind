"use client";

import { useEffect, useState } from "react";
import { audioManager, type AudioSettings } from "@/lib/audio/AudioManager";

/** Reactive wrapper around the AudioManager singleton for settings UI. */
export function useAudioSettings() {
  const [settings, setSettings] = useState<AudioSettings>(() => audioManager.getSettings());

  useEffect(() => {
    setSettings(audioManager.getSettings());
    return audioManager.subscribe(setSettings);
  }, []);

  return {
    settings,
    setMusicEnabled: (enabled: boolean) => audioManager.setMusicEnabled(enabled),
    setSfxEnabled: (enabled: boolean) => audioManager.setSfxEnabled(enabled),
  };
}
