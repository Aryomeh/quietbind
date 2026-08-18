"use client";

import { supabase } from "@/lib/supabase/client";

const STORAGE_KEY = "qb_device_id";

/** Anonymous per-browser device id, persisted in localStorage — same pattern as Kids Number Adventure's devices table. */
export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

/** Upserts the qb_players row for this device so foreign keys on progress/unlocks are satisfied.
 * Pass userId when a session is already active so new devices signed into an
 * existing account get tagged immediately. */
export async function ensurePlayer(deviceId: string, userId?: string | null): Promise<void> {
  if (!deviceId) return;
  const { error } = await supabase.from("qb_players").upsert(
    {
      device_id: deviceId,
      platform: "web",
      last_seen: new Date().toISOString(),
      ...(userId ? { user_id: userId } : {}),
    },
    { onConflict: "device_id" }
  );
  if (error) console.error("ensurePlayer error", error);
}

/** Tags this device's player/progress/unlock rows with the signed-in user's
 * id, so progress made here becomes discoverable from any other device
 * signed into the same Google account. Call once right after sign-in. */
export async function linkDeviceToUser(deviceId: string, userId: string): Promise<void> {
  if (!deviceId || !userId) return;
  const [playersRes, progressRes, unlocksRes] = await Promise.all([
    supabase.from("qb_players").update({ user_id: userId }).eq("device_id", deviceId),
    supabase.from("qb_progress").update({ user_id: userId }).eq("device_id", deviceId),
    supabase.from("qb_unlocked_chapters").update({ user_id: userId }).eq("device_id", deviceId),
  ]);
  if (playersRes.error) console.error("linkDeviceToUser (players) error", playersRes.error);
  if (progressRes.error) console.error("linkDeviceToUser (progress) error", progressRes.error);
  if (unlocksRes.error) console.error("linkDeviceToUser (unlocks) error", unlocksRes.error);
}
