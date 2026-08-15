import Link from "next/link";
import { storyCatalog } from "@/lib/stories/catalog";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#14171f] px-6 py-12 text-[#e8d9b0]">
      <div className="w-full max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-[#e8d9b0]/50">Quietbind</p>
        <h1 className="mt-1 text-2xl font-semibold">Choose a story</h1>

        <div className="mt-6 flex flex-col gap-3">
          {storyCatalog.map((story) => (
            <div
              key={story.slug}
              className={`rounded-2xl border px-5 py-4 ${
                story.playable
                  ? "border-[#caa14d]/40 bg-[#1f2330]"
                  : "border-[#e8d9b0]/10 bg-[#1a1d27] opacity-60"
              }`}
            >
              <p className="font-semibold">{story.title}</p>
              <p className="text-sm text-[#e8d9b0]/60">{story.genre}</p>
              {story.playable ? (
                <Link
                  href={`/play/${story.slug}/1`}
                  className="mt-3 inline-block rounded-lg bg-[#caa14d] px-4 py-2 text-sm font-medium text-[#14171f]"
                >
                  Play
                </Link>
              ) : (
                <p className="mt-3 text-xs uppercase tracking-wide text-[#e8d9b0]/40">
                  Coming soon
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
