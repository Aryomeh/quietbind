import Link from "next/link";

const settingsGroups = [
  {
    title: "Reading",
    items: ["Text speed", "Auto-advance", "Skip read text"],
  },
  {
    title: "Audio",
    items: ["Music volume", "Sound effects", "Voice (unavailable)"],
  },
  {
    title: "Display",
    items: ["Text size", "Reduce motion"],
  },
];

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#14171f] px-6 py-12 text-[#e8d9b0]">
      <div className="w-full max-w-md">
        <Link href="/" className="text-xs text-[#e8d9b0]/40 hover:text-[#e8d9b0]/70">
          ← Menu
        </Link>
        <h1 className="mt-4 text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-[#e8d9b0]/50">Placeholder — not wired up yet.</p>

        <div className="mt-6 flex flex-col gap-6">
          {settingsGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#e8d9b0]/40">
                {group.title}
              </p>
              <div className="overflow-hidden rounded-2xl border border-[#e8d9b0]/10 bg-[#1a1d27]">
                {group.items.map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i !== group.items.length - 1 ? "border-b border-[#e8d9b0]/10" : ""
                    }`}
                  >
                    <span className="text-sm text-[#e8d9b0]/80">{item}</span>
                    <span className="text-xs text-[#e8d9b0]/30">—</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
