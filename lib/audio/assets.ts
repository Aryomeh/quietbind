/**
 * Audio asset paths for the first batch (Inkwell & Ivy only, Ch.1–3).
 * SFX live under inkwell-and-ivy/ for now since it's the only story with
 * real assets — move to a shared /assets/audio/sfx/ location once a
 * second story ships and the platform-wide UI sounds need to live
 * somewhere story-agnostic.
 */

export const MENU_BGM = "/assets/stories/inkwell-and-ivy/audio/bgm/menu-theme.mp3";

const BGM_BASE = "/assets/stories/inkwell-and-ivy/audio/bgm";

const INKWELL_AND_IVY_BGM: Record<string, string> = {
  "shop-exterior-morning": `${BGM_BASE}/shop-exterior-morning.mp3`,
  "shop-interior-morning": `${BGM_BASE}/shop-interior-morning.mp3`,
};

const STORY_BGM: Record<string, Record<string, string>> = {
  "inkwell-and-ivy": INKWELL_AND_IVY_BGM,
};

const STORY_DEFAULT_BGM: Record<string, string> = {
  "inkwell-and-ivy": `${BGM_BASE}/shop-interior-morning.mp3`,
};

/**
 * Ch.3 ("The Lease Letter") reuses the "shop-interior-morning" background
 * key but the tone shifts — cozy morning undercut by real stakes — so it
 * gets the tension variant instead of the regular interior track. This is
 * a chapter-number special case rather than a new background key because
 * the chapter data doesn't yet carry a mood/tension field; worth revisiting
 * if more chapters need a tonal music shift without a background change.
 */
export function getBgmForChapter(
  storySlug: string,
  chapterNumber: number,
  background: string | undefined
): string | null {
  if (storySlug === "inkwell-and-ivy" && chapterNumber === 3 && background === "shop-interior-morning") {
    return `${BGM_BASE}/shop-interior-tension.mp3`;
  }
  const map = STORY_BGM[storySlug];
  if (background && map?.[background]) return map[background];
  return STORY_DEFAULT_BGM[storySlug] ?? null;
}

const SFX_BASE = "/assets/stories/inkwell-and-ivy/audio/sfx";

export const SFX = {
  choiceSelect: `${SFX_BASE}/choice-select.mp3`,
  chapterComplete: `${SFX_BASE}/chapter-complete.mp3`,
  adGateUnlock: `${SFX_BASE}/ad-gate-unlock.mp3`,
  notificationNote: `${SFX_BASE}/notification-note.mp3`,
};
