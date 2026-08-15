import Link from "next/link";
import Image from "next/image";
import { BookOpen, Trophy, Settings, UserCircle } from "lucide-react";

const menuItems = [
  {
    href: "/stories",
    label: "Select Story",
    description: "Pick from your library",
    icon: BookOpen,
    primary: true,
  },
  {
    href: "/achievements",
    label: "Achievements",
    description: "Track your progress",
    icon: Trophy,
    primary: false,
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Text speed, audio, more",
    icon: Settings,
    primary: false,
  },
  {
    href: "/account",
    label: "Account",
    description: "Sign in to sync progress",
    icon: UserCircle,
    primary: false,
  },
];

export function MainMenu() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#0d0f16] px-6 py-14 text-[#e8d9b0]">
      {/* soft radial glow behind everything */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(202,161,77,0.16),transparent_60%)]" />

      <div className="relative flex flex-col items-center">
        <div className="relative h-16 w-16 opacity-90">
          <Image
            src="/assets/branding/wobblewing-studios-logo.png"
            alt=""
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.4em] text-[#e8d9b0]/40">
          Wobblewing Studios presents
        </p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-[#f6ecd6]">
          Quietbind
        </h1>
      </div>

      <nav className="relative mt-14 flex w-full max-w-sm flex-col gap-3">
        {menuItems.map(({ href, label, description, icon: Icon, primary }) => (
          <Link
            key={href}
            href={href}
            className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${
              primary
                ? "border-[#caa14d]/50 bg-gradient-to-r from-[#caa14d]/20 to-[#caa14d]/5 hover:border-[#caa14d]"
                : "border-[#e8d9b0]/10 bg-[#161925] hover:border-[#e8d9b0]/25 hover:bg-[#1b1e2b]"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                primary ? "bg-[#caa14d] text-[#14171f]" : "bg-[#e8d9b0]/10 text-[#e8d9b0]"
              }`}
            >
              <Icon size={20} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  primary ? "text-[#f6ecd6]" : "text-[#e8d9b0]"
                }`}
              >
                {label}
              </p>
              <p className="text-xs text-[#e8d9b0]/50">{description}</p>
            </div>
            <span className="text-[#e8d9b0]/30 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        ))}
      </nav>

      <p className="relative mt-auto pt-14 text-[10px] uppercase tracking-[0.3em] text-[#e8d9b0]/25">
        v0.0.1 · not signed in
      </p>
    </div>
  );
}
