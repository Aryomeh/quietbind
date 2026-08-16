import type { CharacterId, Emotion } from "./types";

/**
 * Registry of which stories/characters/emotions have real art files under
 * public/assets/stories/<slug>/characters/<characterId>/<emotion>.png.
 *
 * Empty until real art is sourced. CharacterStage falls back to a
 * placeholder for anything not listed here, so chapter data can reference
 * emotions today and pick up real art automatically the moment an entry
 * is added — no changes needed to story data or the player component.
 *
 * To add art: drop the file at the path above, then add
 * `"<characterId>:<emotion>"` to that story's set below.
 */
const AVAILABLE_ART: Record<string, Set<string>> = {
  "inkwell-and-ivy": new Set([
    "kai:blushing",
    "kai:neutral",
    "kai:happy",
    "kai:serious",
    "kai:annoyed",
    "kai:sad", // reusing neutral.png as a stand-in — swap for a real "sad" generation later
    "ren:blushing",
    "ren:neutral",
    "ren:happy",
    "ren:annoyed",
    "ren:sad",
    "priya:neutral",
    "priya:happy",
  ]),
};

export function characterArtPath(
  storySlug: string,
  characterId: CharacterId,
  emotion: Emotion
): string {
  return `/assets/stories/${storySlug}/characters/${characterId}/${emotion}.png`;
}

export function hasCharacterArt(
  storySlug: string,
  characterId: CharacterId,
  emotion: Emotion
): boolean {
  return AVAILABLE_ART[storySlug]?.has(`${characterId}:${emotion}`) ?? false;
}
