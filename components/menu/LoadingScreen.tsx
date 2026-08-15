"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onDone: () => void;
  durationMs?: number;
}

/**
 * Simulated loading screen shown after the splash, before the main menu.
 * Placeholder progress — no real asset loading behind it yet, but the
 * shape (progress 0-100, onDone callback) is what a real asset-preload
 * step would plug into later.
 */
export function LoadingScreen({ onDone, durationMs = 1800 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / durationMs) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        onDone();
      }
    }, 50);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0d0f16] px-6">
      <p className="text-xs uppercase tracking-[0.4em] text-[#e8d9b0]/50">Quietbind</p>
      <div className="h-1 w-56 overflow-hidden rounded-full bg-[#2a2d38]">
        <div
          className="h-full rounded-full bg-[#caa14d] transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
