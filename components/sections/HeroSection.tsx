export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35] pointer-events-none"
        style={{ backgroundImage: 'url("/images/backgrounds/hero.webp")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,42,42,0.16)_0,_rgba(255,42,42,0)_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/textures/grain.png')] bg-repeat opacity-[0.05] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 max-w-5xl text-center">
        <div className="mx-auto mb-6 h-[2px] w-20 bg-[#ff2a2a]" />
        <p className="mb-5 text-xs tracking-[0.45em] text-zinc-400 uppercase">Collective</p>
        <h1 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          MADMOB
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400">
        <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <span className="h-8 w-[1px] bg-[#ff2a2a]/80" />
      </div>
    </section>
  );
}
