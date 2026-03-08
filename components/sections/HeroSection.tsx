export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,42,42,0.16)_0,_rgba(255,42,42,0)_50%)]" />

      <div className="relative z-10 max-w-5xl text-center">
        <div className="mx-auto mb-6 h-[2px] w-20 bg-[#ff2a2a]" />
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#ff2a2a]">Collective</p>
        <h1 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          MADMOB
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          A Tunisian-founded, globally connected music collective, label, and cultural movement. Since 2015, we’ve
          united artists, producers, DJs, and curators to push hip-hop culture beyond boundaries: from beats and
          events to visuals and art direction.
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-400">
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="h-8 w-[1px] bg-[#ff2a2a]/80" />
      </div>
    </section>
  );
}
