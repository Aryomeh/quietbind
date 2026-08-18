import type { StoryManifest } from "@/lib/engine/types";
import type { RouteSplitConfig } from "@/lib/engine/route";

/** Ch.11 "Lila's Letters" decides the route: whichever of Kai/Ren has the
 * higher affection total wins; a tie is broken by the Ch.9 festival-prep
 * "who do you lean on" choice (docs/inkwell-and-ivy-STORY-OUTLINE.md). */
export const inkwellAndIvyRouteSplit: RouteSplitConfig = {
  chapter: 11,
  candidates: [
    { route: "kai", affectionKey: "kai", tiebreakerFlag: "ch9LeanedKai" },
    { route: "ren", affectionKey: "ren", tiebreakerFlag: "ch9LeanedRen" },
  ],
};

/**
 * Story manifest for Inkwell & Ivy — the reference implementation story.
 * Cast, route lock, and ending tiers sourced from
 * docs/inkwell-and-ivy-STORY-OUTLINE.md.
 *
 * Chapter data itself (the actual scripts) lands in this same folder as
 * chapter-01.ts, chapter-02.ts, etc. once written — not part of this step.
 */
export const inkwellAndIvyManifest: StoryManifest = {
  slug: "inkwell-and-ivy",
  title: "Inkwell & Ivy",
  totalChapters: 20,
  routeLockChapter: 11,
  characters: [
    { id: "kai", name: "Kai", isLoveInterest: true },
    { id: "ren", name: "Ren", isLoveInterest: true },
    { id: "priya", name: "Priya", isLoveInterest: false },
    { id: "thorne", name: "Marcus Thorne", isLoveInterest: false },
    { id: "elias", name: "Elias Voss", isLoveInterest: false },
  ],
  endingTiers: [
    { id: "kai-good", route: "kai", label: "Good", minAffection: 70 },
    { id: "kai-warm", route: "kai", label: "Warm-but-unresolved", minAffection: 40 },
    { id: "kai-bittersweet", route: "kai", label: "Bittersweet", minAffection: 0 },
    { id: "ren-good", route: "ren", label: "Good", minAffection: 70 },
    { id: "ren-warm", route: "ren", label: "Warm-but-unresolved", minAffection: 40 },
    { id: "ren-bittersweet", route: "ren", label: "Bittersweet", minAffection: 0 },
  ],
};
