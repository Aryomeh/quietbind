import type { Chapter, RouteId } from "@/lib/engine/types";
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
import { chapter11 } from "@/lib/stories/inkwell-and-ivy/chapter-11";
import { chapter12Kai } from "@/lib/stories/inkwell-and-ivy/routes/kai/chapter-12";
import { chapter13Kai } from "@/lib/stories/inkwell-and-ivy/routes/kai/chapter-13";
import { chapter12Ren } from "@/lib/stories/inkwell-and-ivy/routes/ren/chapter-12";
import { chapter13Ren } from "@/lib/stories/inkwell-and-ivy/routes/ren/chapter-13";

/**
 * Chapters 1-11: shared, same content regardless of route (Ch.11 is the
 * route-split chapter itself, see manifest.inkwellAndIvyRouteSplit).
 * Keyed by chapter number, same as before the route split existed.
 */
export const inkwellAndIvySharedChapters: Record<number, Chapter> = {
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
  11: chapter11,
};

/**
 * Chapters 12+: route-specific. Kai-route and Ren-route chapter 12 are
 * different Chapter objects that happen to share a chapter number, so they
 * can't live in one flat Record<number, Chapter> the way 1-11 do. Keyed
 * first by route, then by chapter number. Add new route chapters here as
 * they're written.
 */
export const inkwellAndIvyRouteChapters: Record<string, Record<number, Chapter>> = {
  kai: {
    12: chapter12Kai,
    13: chapter13Kai,
  },
  ren: {
    12: chapter12Ren,
    13: chapter13Ren,
  },
};

/**
 * Single lookup a player-facing page can call without caring whether a
 * chapter is shared or route-locked. `route` should be the player's
 * *saved* route (from SavedProgress.route) once past Ch.11, "shared" or
 * undefined is fine for chapters 1-11, which ignore it.
 */
export function getInkwellAndIvyChapter(
  chapterNumber: number,
  route?: RouteId | null
): Chapter | undefined {
  if (chapterNumber <= 11) return inkwellAndIvySharedChapters[chapterNumber];
  if (!route || route === "shared") return undefined;
  return inkwellAndIvyRouteChapters[route]?.[chapterNumber];
}

/** True if chapterNumber + 1 exists for this route, drives the "Continue" link after the ad. */
export function hasNextInkwellAndIvyChapter(chapterNumber: number, route?: RouteId | null): boolean {
  return getInkwellAndIvyChapter(chapterNumber + 1, route) !== undefined;
}

/**
 * @deprecated Chapters 1-11 only, kept for the dev chapter browser, which
 * plays chapters outside the normal progress flow and has no saved route to
 * look up. Do not use for chapters 12+; use getInkwellAndIvyChapter instead.
 */
export const inkwellAndIvyChapters = inkwellAndIvySharedChapters;
