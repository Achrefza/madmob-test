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

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-400">
        <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <span className="h-8 w-[1px] bg-[var(--accent-red)]/80" />
      </div>
    </section>
  );
}
