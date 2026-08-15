"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { SplashScreen } from "@/components/menu/SplashScreen";
import { LoadingScreen } from "@/components/menu/LoadingScreen";
import { MainMenu } from "@/components/menu/MainMenu";

type Phase = "splash" | "loading" | "menu";

const BOOTED_KEY = "qb_booted";

/**
 * App entry sequence: publisher splash -> simulated loading -> main menu.
 * Only plays on a true first open per browser session (sessionStorage
 * flag) — navigating back to "/" from Achievements/Settings/Account/a
 * chapter goes straight to the menu instead of replaying the splash.
 */
export default function Home() {
  const [phase, setPhase] = useState<Phase>("splash");

  // Runs before paint, so a returning visit never visibly flashes the
  // splash frame even though the initial render (matching SSR) is "splash".
  useLayoutEffect(() => {
    if (sessionStorage.getItem(BOOTED_KEY)) setPhase("menu");
  }, []);

  useEffect(() => {
    if (phase !== "splash") return;
    const timer = setTimeout(() => setPhase("loading"), 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  function finishLoading() {
    sessionStorage.setItem(BOOTED_KEY, "1");
    setPhase("menu");
  }

  if (phase === "splash") return <SplashScreen />;
  if (phase === "loading") return <LoadingScreen onDone={finishLoading} />;
  return <MainMenu />;
}
