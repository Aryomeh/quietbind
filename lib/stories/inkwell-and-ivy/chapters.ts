import type { Chapter } from "@/lib/engine/types";
import { chapter01 } from "@/lib/stories/inkwell-and-ivy/chapter-01";
import { chapter02 } from "@/lib/stories/inkwell-and-ivy/chapter-02";
import { chapter03 } from "@/lib/stories/inkwell-and-ivy/chapter-03";

/**
 * All Inkwell & Ivy chapters written so far, keyed by chapter number.
 * Add new chapters here as they're written — this is what the story
 * picker/player shell (step 5) and the dev chapter browser both read from.
 */
export const inkwellAndIvyChapters: Record<number, Chapter> = {
  1: chapter01,
  2: chapter02,
  3: chapter03,
};
