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
