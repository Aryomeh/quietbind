import Image from "next/image";

/**
 * First thing shown on every app open — publisher splash before the
 * simulated loading screen and main menu.
 */
export function SplashScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0f16] px-6">
      <div className="relative h-56 w-56 animate-[fadeIn_0.6s_ease-out]">
        <Image
          src="/assets/branding/wobblewing-studios-logo.png"
          alt="Wobblewing Studios"
          fill
          sizes="224px"
          priority
          className="object-contain"
        />
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
