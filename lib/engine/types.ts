/**
 * Quietbind chapter data schema.
 *
 * This is the platform-wide contract every story's chapter data conforms
 * to (see docs/quietbind-PLATFORM.md §3 for the shared conventions this
 * encodes: 20 chapters, route lock, 3 love interests, 6 endings).
 *
 * Story content lives as data files under lib/stories/<slug>/, built from
 * these types — not hardcoded into components. The VN engine (dialogue
 * box, choice UI, affection HUD) reads this shape and doesn't need to
 * change per story.
 */

/** Route a chapter belongs to. "shared" plays for every player regardless of route. */
export type RouteId = "shared" | string; // e.g. "kai" | "ren" for Inkwell & Ivy

/** A character who can speak or be tracked for affection. */
export type CharacterId = string;

/** Expression tag used to pick a character art variant. Falls back to "neutral" if that variant doesn't exist yet. */
export type Emotion =
  | "neutral"
  | "happy"
  | "sad"
  | "surprised"
  | "annoyed"
  | "blushing"
  | "serious";

export interface DialogueLine {
  type: "dialogue";
  id: string;
  /** Character id, or "narrator" for scene description / no speaker. */
  speaker: CharacterId | "narrator";
  text: string;
  emotion?: Emotion;
  /** Background asset key, e.g. "shop-interior-morning". Persists until a later line changes it. */
  background?: string;
  /**
   * Only show this line if the given story flag is set. Lets a subplot
   * (e.g. the anonymous-notes mystery thread) live inside the existing
   * chapter beats instead of needing extra chapters — see the outline's
   * "chapter touchpoints" table.
   */
  requiresFlag?: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  /** Affection point deltas applied when this option is picked. */
  affectionDelta?: Partial<Record<CharacterId, number>>;
  /** Story flag set when this option is picked (e.g. "leanedKaiCh9" for a route tiebreaker). */
  setsFlag?: string;
  /** Node id to jump to next. If omitted, play continues to the next node in sequence. */
  goto?: string;
}

export interface ChoiceBlock {
  type: "choice";
  id: string;
  prompt?: string;
  options: ChoiceOption[];
}

export type ChapterNode = DialogueLine | ChoiceBlock;

export interface Chapter {
  storySlug: string;
  chapterNumber: number;
  title: string;
  act: number;
  /** "shared" for pre-lock (and post-route-merge) chapters; a route id for route-locked chapters. */
  route: RouteId;
  /** Chapters 1–3 free by platform convention; everything after is ad-gated unless overridden. */
  freeTier: boolean;
  nodes: ChapterNode[];
}

/** A trackable character for a story — seeds affection state and the HUD. */
export interface StoryCharacter {
  id: CharacterId;
  name: string;
  isLoveInterest: boolean;
}

/** One ending tier, keyed off final affection total on a route at the last chapter. */
export interface EndingTier {
  id: string;
  route: RouteId;
  label: string; // e.g. "Good", "Warm-but-unresolved", "Bittersweet"
  minAffection: number;
}

export interface StoryManifest {
  slug: string;
  title: string;
  totalChapters: number;
  routeLockChapter: number;
  characters: StoryCharacter[];
  endingTiers: EndingTier[];
}
