"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onDone: () => void;
}

// [target %, ms to animate from the previous target to this one]
// Fast climb to 50, a stall, fast climb to 80, a stall, fast finish.
// Totals 8000ms: 1200 + 2200 + 900 + 2200 + 1500.
const STEPS: Array<[number, number]> = [
  [50, 1200],
  [50, 2200], // stall at 50%
  [80, 900],
  [80, 2200], // stall at 80%
  [100, 1500],
];

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let stepIndex = 0;
    let fromValue = 0;
    let stepStart = performance.now();
    let rafId: number;

    function tick(now: number) {
      if (cancelled) return;
      const [target, duration] = STEPS[stepIndex];
      const t = Math.min(1, (now - stepStart) / duration);
      setProgress(fromValue + (target - fromValue) * t);

      if (t >= 1) {
        fromValue = target;
        stepIndex += 1;
        stepStart = now;
        if (stepIndex >= STEPS.length) {
          onDone();
          return;
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0d0f16] px-6">
      <p className="text-xs uppercase tracking-[0.4em] text-[#e8d9b0]/50">Quietbind</p>
      <div className="h-1 w-56 overflow-hidden rounded-full bg-[#2a2d38]">
        <div
          className="h-full rounded-full bg-[#caa14d]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] tabular-nums text-[#e8d9b0]/40">{Math.round(progress)}%</p>
    </div>
  );
}
