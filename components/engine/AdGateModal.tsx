"use client";

import { useEffect, useState } from "react";

interface AdGateModalProps {
  onComplete: () => void;
  durationMs?: number;
}

/**
 * Placeholder for the real rewarded-ad SDK (AdMob/Monetag per the
 * platform's monetization plan). Pops in, shows a countdown, then
 * dismisses itself and calls onComplete — same shape a real rewarded ad
 * callback would have, so swapping in the real SDK later is a drop-in
 * replacement for this component, not a rework of the call sites.
 */
export function AdGateModal({ onComplete, durationMs = 3000 }: AdGateModalProps) {
  const totalSeconds = Math.ceil(durationMs / 1000);
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, durationMs);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#caa14d]/40 bg-[#1f2330] px-6 py-8 text-center shadow-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[#e8d9b0]/50">Advertisement</p>
        <p className="mt-3 text-lg font-semibold text-[#e8d9b0]">AdMob placeholder</p>
        <p className="mt-2 text-sm text-[#e8d9b0]/60">
          Real rewarded ad SDK plugs in here later. Closing in {remaining}s…
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#3a3122]">
          <div
            className="h-full rounded-full bg-[#caa14d] transition-all duration-1000 ease-linear"
            style={{ width: `${(remaining / totalSeconds) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
