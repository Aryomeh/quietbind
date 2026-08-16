"use client";

import { supabase } from "@/lib/supabase/client";

/** Chapter 1 of any story is always accessible; everything else needs a qb_unlocked_chapters row. */
export async function isChapterUnlocked(
  deviceId: string,
  storySlug: string,
  chapterNumber: number
): Promise<boolean> {
  if (chapterNumber <= 1) return true;
  if (!deviceId) return false;

  const { data, error } = await supabase
    .from("qb_unlocked_chapters")
    .select("chapter_number")
    .eq("device_id", deviceId)
    .eq("story_slug", storySlug)
    .eq("chapter_number", chapterNumber)
    .maybeSingle();

  if (error) {
    console.error("isChapterUnlocked error", error);
    return false;
  }
  return !!data;
}

export async function unlockChapter(
  deviceId: string,
  storySlug: string,
  chapterNumber: number,
  method: "free" | "ad" | "iap" = "ad"
): Promise<void> {
  if (!deviceId) return;
  const { error } = await supabase.from("qb_unlocked_chapters").upsert(
    { device_id: deviceId, story_slug: storySlug, chapter_number: chapterNumber, unlock_method: method },
    { onConflict: "device_id,story_slug,chapter_number" }
  );
  if (error) console.error("unlockChapter error", error);
}

/** All chapter numbers this device has unlocked for a story (via qb_unlocked_chapters), used to build the chapter picker's lock/unlock state in one query instead of one per chapter. Chapter 1 is always implicitly unlocked and isn't stored as a row, so it's added here regardless of what's in the DB. */
export async function getUnlockedChapters(
  deviceId: string,
  storySlug: string
): Promise<Set<number>> {
  const unlocked = new Set<number>([1]);
  if (!deviceId) return unlocked;

  const { data, error } = await supabase
    .from("qb_unlocked_chapters")
    .select("chapter_number")
    .eq("device_id", deviceId)
    .eq("story_slug", storySlug);

  if (error) {
    console.error("getUnlockedChapters error", error);
    return unlocked;
  }
  for (const row of data ?? []) unlocked.add(row.chapter_number);
  return unlocked;
}

/** The chapter this device most recently saved progress on for a story — used for the picker's "Continue" shortcut. Null if they've never played this story. */
export async function getLastReadChapter(
  deviceId: string,
  storySlug: string
): Promise<number | null> {
  if (!deviceId) return null;

  const { data, error } = await supabase
    .from("qb_progress")
    .select("chapter_number")
    .eq("device_id", deviceId)
    .eq("story_slug", storySlug)
    .maybeSingle();

  if (error) {
    console.error("getLastReadChapter error", error);
    return null;
  }
  return data?.chapter_number ?? null;
}

export async function saveProgress(
  deviceId: string,
  storySlug: string,
  chapterNumber: number,
  route: string,
  affection: Record<string, number>,
  flags: string[]
): Promise<void> {
  if (!deviceId) return;
  const flagsObj = Object.fromEntries(flags.map((f) => [f, true]));
  const { error } = await supabase.from("qb_progress").upsert(
    {
      device_id: deviceId,
      story_slug: storySlug,
      chapter_number: chapterNumber,
      route,
      affection,
      flags: flagsObj,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "device_id,story_slug" }
  );
  if (error) console.error("saveProgress error", error);
}
