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

/** Upserts the qb_players row for this device so foreign keys on progress/unlocks are satisfied. */
export async function ensurePlayer(deviceId: string): Promise<void> {
  if (!deviceId) return;
  const { error } = await supabase.from("qb_players").upsert(
    { device_id: deviceId, platform: "web", last_seen: new Date().toISOString() },
    { onConflict: "device_id" }
  );
  if (error) console.error("ensurePlayer error", error);
}
