import type { Chapter } from "@/lib/engine/types";
import { chapter01 } from "@/lib/stories/inkwell-and-ivy/chapter-01";
import { chapter02 } from "@/lib/stories/inkwell-and-ivy/chapter-02";
import { chapter03 } from "@/lib/stories/inkwell-and-ivy/chapter-03";
import { chapter04 } from "@/lib/stories/inkwell-and-ivy/chapter-04";
import { chapter05 } from "@/lib/stories/inkwell-and-ivy/chapter-05";
import { chapter06 } from "@/lib/stories/inkwell-and-ivy/chapter-06";
import { chapter07 } from "@/lib/stories/inkwell-and-ivy/chapter-07";
import { chapter08 } from "@/lib/stories/inkwell-and-ivy/chapter-08";
import { chapter09 } from "@/lib/stories/inkwell-and-ivy/chapter-09";
import { chapter10 } from "@/lib/stories/inkwell-and-ivy/chapter-10";

/**
 * All Inkwell & Ivy chapters written so far, keyed by chapter number.
 * Add new chapters here as they're written — this is what the story
 * picker/player shell (step 5) and the dev chapter browser both read from.
 */
export const inkwellAndIvyChapters: Record<number, Chapter> = {
  1: chapter01,
  2: chapter02,
  3: chapter03,
  4: chapter04,
  5: chapter05,
  6: chapter06,
  7: chapter07,
  8: chapter08,
  9: chapter09,
  10: chapter10,
};
