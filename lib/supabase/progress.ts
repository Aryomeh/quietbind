"use client";

import { supabase } from "@/lib/supabase/client";

/** Chapter 1 of any story is always accessible; everything else needs a qb_unlocked_chapters row.
 * Pass userId when signed in so an unlock made on another device also counts here. */
export async function isChapterUnlocked(
  deviceId: string,
  storySlug: string,
  chapterNumber: number,
  userId?: string | null
): Promise<boolean> {
  if (chapterNumber <= 1) return true;
  if (!deviceId && !userId) return false;

  let query = supabase
    .from("qb_unlocked_chapters")
    .select("chapter_number")
    .eq("story_slug", storySlug)
    .eq("chapter_number", chapterNumber);

  query = userId
    ? query.or(`device_id.eq.${deviceId},user_id.eq.${userId}`)
    : query.eq("device_id", deviceId);

  const { data, error } = await query.limit(1).maybeSingle();

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
  method: "free" | "ad" | "iap" = "ad",
  userId?: string | null
): Promise<void> {
  if (!deviceId) return;
  const { error } = await supabase.from("qb_unlocked_chapters").upsert(
    {
      device_id: deviceId,
      story_slug: storySlug,
      chapter_number: chapterNumber,
      unlock_method: method,
      ...(userId ? { user_id: userId } : {}),
    },
    { onConflict: "device_id,story_slug,chapter_number" }
  );
  if (error) console.error("unlockChapter error", error);
}

/** All chapter numbers this device (and, if signed in, this account across devices)
 * has unlocked for a story, used to build the chapter picker's lock/unlock state in
 * one query instead of one per chapter. Chapter 1 is always implicitly unlocked and
 * isn't stored as a row, so it's added here regardless of what's in the DB. */
export async function getUnlockedChapters(
  deviceId: string,
  storySlug: string,
  userId?: string | null
): Promise<Set<number>> {
  const unlocked = new Set<number>([1]);
  if (!deviceId && !userId) return unlocked;

  let query = supabase.from("qb_unlocked_chapters").select("chapter_number").eq("story_slug", storySlug);
  query = userId
    ? query.or(`device_id.eq.${deviceId},user_id.eq.${userId}`)
    : query.eq("device_id", deviceId);

  const { data, error } = await query;

  if (error) {
    console.error("getUnlockedChapters error", error);
    return unlocked;
  }
  for (const row of data ?? []) unlocked.add(row.chapter_number);
  return unlocked;
}

/** The chapter most recently saved for a story, checked across this device and,
 * if signed in, every device tied to this account — used for the picker's
 * "Continue" shortcut. Null if never played. */
export async function getLastReadChapter(
  deviceId: string,
  storySlug: string,
  userId?: string | null
): Promise<number | null> {
  if (!deviceId && !userId) return null;

  let query = supabase.from("qb_progress").select("chapter_number").eq("story_slug", storySlug);
  query = userId
    ? query.or(`device_id.eq.${deviceId},user_id.eq.${userId}`)
    : query.eq("device_id", deviceId);

  const { data, error } = await query.order("updated_at", { ascending: false }).limit(1).maybeSingle();

  if (error) {
    console.error("getLastReadChapter error", error);
    return null;
  }
  return data?.chapter_number ?? null;
}

/** Full saved progress row for a story — affection totals, story flags, and
 * the locked route (if any) — used to carry state forward into the next
 * chapter instead of starting each chapter from zero. Checked across this
 * device and, if signed in, every device tied to this account. Null if
 * never played. */
export interface SavedProgress {
  chapterNumber: number;
  route: string;
  affection: Record<string, number>;
  flags: string[];
}

export async function getProgress(
  deviceId: string,
  storySlug: string,
  userId?: string | null
): Promise<SavedProgress | null> {
  if (!deviceId && !userId) return null;

  let query = supabase
    .from("qb_progress")
    .select("chapter_number, route, affection, flags")
    .eq("story_slug", storySlug);
  query = userId
    ? query.or(`device_id.eq.${deviceId},user_id.eq.${userId}`)
    : query.eq("device_id", deviceId);

  const { data, error } = await query.order("updated_at", { ascending: false }).limit(1).maybeSingle();

  if (error) {
    console.error("getProgress error", error);
    return null;
  }
  if (!data) return null;

  return {
    chapterNumber: data.chapter_number,
    route: data.route,
    affection: (data.affection as Record<string, number>) ?? {},
    flags: Object.keys((data.flags as Record<string, boolean>) ?? {}),
  };
}

export async function saveProgress(
  deviceId: string,
  storySlug: string,
  chapterNumber: number,
  route: string,
  affection: Record<string, number>,
  flags: string[],
  userId?: string | null
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
      ...(userId ? { user_id: userId } : {}),
    },
    { onConflict: "device_id,story_slug" }
  );
  if (error) console.error("saveProgress error", error);
}
