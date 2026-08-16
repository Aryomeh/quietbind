"use client";

import { useEffect, useState } from "react";
import { runRewardedAdWaterfall, type AdNetwork } from "@/lib/ads/adService";

interface AdGateModalProps {
  onComplete: () => void;
  durationMs?: number;
}

const NETWORK_LABEL: Record<AdNetwork, string> = {
  admob: "AdMob placeholder",
  monetag: "Monetag placeholder (fallback)",
};

/**
 * Placeholder for the real rewarded-ad SDKs (AdMob primary, Monetag
 * fallback per the platform's monetization plan). Runs the waterfall in
 * lib/ads/adService.ts, shows a countdown for whichever network "loaded",
 * then dismisses itself and calls onComplete — same shape a real
 * rewarded-ad callback would have, so swapping in the real SDKs later is
 * a drop-in replacement inside adService.ts, not a rework of this
 * component or its call sites.
 */
export function AdGateModal({ onComplete, durationMs = 3000 }: AdGateModalProps) {
  const totalSeconds = Math.ceil(durationMs / 1000);
  const [remaining, setRemaining] = useState(totalSeconds);
  const [network, setNetwork] = useState<AdNetwork>("admob");

  useEffect(() => {
    let cancelled = false;
    const interval = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);

    runRewardedAdWaterfall(durationMs).then((usedNetwork) => {
      if (cancelled) return;
      clearInterval(interval);
      setNetwork(usedNetwork);
      onComplete();
    });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#caa14d]/40 bg-[#1f2330] px-6 py-8 text-center shadow-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[#e8d9b0]/50">Advertisement</p>
        <p className="mt-3 text-lg font-semibold text-[#e8d9b0]">{NETWORK_LABEL[network]}</p>
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
