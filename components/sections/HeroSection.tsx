export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(205,28,24,0.16)_0,_rgba(205,28,24,0)_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl text-center">
        <div className="mx-auto mb-6 h-[2px] w-20 bg-[var(--accent-red)]" />
        <p className="mb-5 text-xs tracking-[0.45em] text-zinc-400 uppercase">Collective</p>
        <h1 className="font-madmob text-8xl">
          MADMOB
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400">
        <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <span className="h-8 w-[1px] bg-[var(--accent-red)]/80" />
      </div>
    </section>
  );
}
