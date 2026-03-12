"use client";

const handleExploreCollective = () => {
  const collectiveSection = document.getElementById("collective");

  if (!collectiveSection) {
    return;
  }

  collectiveSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(205,28,24,0.16)_0,_rgba(205,28,24,0)_50%)] pointer-events-none" />

      <div className="relative z-20 max-w-5xl text-center">
        <div className="mx-auto mb-6 h-[2px] w-20 bg-[var(--accent-red)]" />
        <h1 className="mx-auto max-w-[90vw] text-center font-madmob text-[clamp(3rem,10vw,8rem)] text-white">
          MADMOB
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
        </p>
      </div>

      <div className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 sm:bottom-20">
        <button
          type="button"
          onClick={handleExploreCollective}
          className="group inline-flex min-w-[13rem] flex-col items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3 text-white transition-all duration-300 ease-out hover:scale-105 hover:border-white hover:bg-white/5 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.28)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          style={{ animation: "heroExploreFloatGlow 2.5s ease-in-out infinite" }}
          aria-label="Explore collective"
        >
          <span className="text-center font-madmob text-xs tracking-[0.18em] sm:tracking-[0.25em]">
            PRESS / SCROLL
          </span>
          <span className="text-center font-madmob text-xs tracking-[0.18em] sm:tracking-[0.25em]">
            TO EXPLORE
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes heroExploreFloatGlow {
          0%,
          100% {
            transform: translateY(0);
            border-color: rgba(255, 255, 255, 0.7);
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }

          50% {
            transform: translateY(-4px);
            border-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 18px rgba(255, 255, 255, 0.16);
          }
        }
      `}</style>
    </section>
  );
}
