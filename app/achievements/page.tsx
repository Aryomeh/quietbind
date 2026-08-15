import Link from "next/link";
import { Lock, Trophy } from "lucide-react";

const placeholderAchievements = [
  "First Chapter", "Warm Welcome", "The Full Story", "Kai's Confidant",
  "Ren's Confidant", "Secret Keeper", "True Ending", "Completionist",
];

export default function AchievementsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#14171f] px-6 py-12 text-[#e8d9b0]">
      <div className="w-full max-w-md">
        <Link href="/" className="text-xs text-[#e8d9b0]/40 hover:text-[#e8d9b0]/70">
          ← Menu
        </Link>
        <h1 className="mt-4 text-2xl font-semibold">Achievements</h1>
        <p className="mt-1 text-sm text-[#e8d9b0]/50">Placeholder — not wired up yet.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {placeholderAchievements.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-2xl border border-[#e8d9b0]/10 bg-[#1a1d27] px-4 py-5 text-center opacity-60"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8d9b0]/10">
                <Lock size={16} className="text-[#e8d9b0]/40" />
              </div>
              <p className="text-xs font-medium text-[#e8d9b0]/70">{name}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-[#e8d9b0]/30">
          <Trophy size={14} /> 0 / {placeholderAchievements.length} unlocked
        </p>
      </div>
    </main>
  );
}
