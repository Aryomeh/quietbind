"use client";

/**
 * Platform-wide audio manager. A singleton outside the React tree so
 * background music keeps playing uninterrupted as the player navigates
 * between menu / settings / achievements / a chapter — only ChapterPlayer
 * explicitly switches the track when the scene changes.
 *
 * Settings (music on/off, sfx on/off) persist to localStorage so they
 * survive a reload, same pattern as the anonymous device-id in
 * lib/supabase/device.ts.
 */

const STORAGE_KEY = "qb_audio_settings";

export interface AudioSettings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
}

const DEFAULT_SETTINGS: AudioSettings = {
  musicEnabled: true,
  sfxEnabled: true,
};

type Listener = (settings: AudioSettings) => void;

class AudioManagerImpl {
  private settings: AudioSettings = DEFAULT_SETTINGS;
  private bgmEl: HTMLAudioElement | null = null;
  private currentBgmKey: string | null = null;
  private listeners = new Set<Listener>();
  private initialized = false;

  /** Lazy-inits on first real use so this is safe to import from server-rendered modules. */
  private init() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      // malformed/blocked storage — fall back to defaults
    }

    this.bgmEl = new Audio();
    this.bgmEl.loop = true;
    this.bgmEl.volume = 0.55;
  }

  getSettings(): AudioSettings {
    this.init();
    return this.settings;
  }

  subscribe(listener: Listener): () => void {
    this.init();
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private persist() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
      } catch {
        // ignore write failures (private browsing, storage full, etc.)
      }
    }
    this.listeners.forEach((l) => l(this.settings));
  }

  setMusicEnabled(enabled: boolean) {
    this.init();
    this.settings = { ...this.settings, musicEnabled: enabled };
    this.persist();
    if (!this.bgmEl) return;
    if (!enabled) {
      this.bgmEl.pause();
    } else if (this.currentBgmKey) {
      this.bgmEl.play().catch(() => {});
    }
  }

  setSfxEnabled(enabled: boolean) {
    this.init();
    this.settings = { ...this.settings, sfxEnabled: enabled };
    this.persist();
  }

  /** Switches to a bgm track by key (e.g. "inkwell-and-ivy:shop-interior-morning:2"). No-op if already on that key. */
  playBgm(key: string, src: string) {
    this.init();
    if (!this.bgmEl || this.currentBgmKey === key) return;
    this.currentBgmKey = key;
    this.bgmEl.src = src;
    if (this.settings.musicEnabled) {
      // Autoplay can be blocked until a user gesture happens — harmless no-op if so,
      // the track will start once toggled or on the next interaction-driven call.
      this.bgmEl.play().catch(() => {});
    }
  }

  stopBgm() {
    this.init();
    this.currentBgmKey = null;
    this.bgmEl?.pause();
  }

  /** Fire-and-forget one-shot sound effect. Respects the sfx on/off setting. */
  playSfx(src: string) {
    this.init();
    if (!this.settings.sfxEnabled || typeof window === "undefined") return;
    const el = new Audio(src);
    el.volume = 0.7;
    el.play().catch(() => {});
  }
}

export const audioManager = new AudioManagerImpl();
