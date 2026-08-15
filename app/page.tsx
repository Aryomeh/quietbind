"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "@/components/menu/SplashScreen";
import { LoadingScreen } from "@/components/menu/LoadingScreen";
import { MainMenu } from "@/components/menu/MainMenu";

type Phase = "splash" | "loading" | "menu";

/**
 * App entry sequence, shown every time the app opens: publisher splash ->
 * simulated loading -> main menu. "Select Story" from the menu goes to
 * /stories (the story picker); Achievements/Settings/Account are their
 * own routes, all placeholders except the story flow itself.
 */
export default function Home() {
  const [phase, setPhase] = useState<Phase>("splash");

  useEffect(() => {
    if (phase !== "splash") return;
    const timer = setTimeout(() => setPhase("loading"), 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "splash") return <SplashScreen />;
  if (phase === "loading") return <LoadingScreen onDone={() => setPhase("menu")} />;
  return <MainMenu />;
}
