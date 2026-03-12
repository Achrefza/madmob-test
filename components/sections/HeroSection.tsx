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

      <div className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2">
        <button
          type="button"
          onClick={handleExploreCollective}
          className="group inline-flex items-center justify-center gap-2 rounded-md border border-white/70 bg-transparent px-5 py-2.5 text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/5 hover:shadow-[0_0_18px_rgba(255,255,255,0.22)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          style={{ animation: "heroExploreFloat 3s ease-in-out infinite" }}
          aria-label="Explore collective"
        >
          <span className="font-madmob text-base tracking-[0.08em]">Explore</span>
          <span aria-hidden="true" className="text-sm leading-none transition-transform duration-300 group-hover:translate-y-0.5">
            ↓
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes heroExploreFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  );
}
