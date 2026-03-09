export default function BleedSection() {
  return (
    <section id="bleed" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.28),rgba(0,0,0,0)_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.92))]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Interlude</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          A Silent Frame Before the Next Impact
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-zinc-300 leading-relaxed">
          Between noise and movement, we hold space for tension, clarity, and intent. This pause is part of the narrative—
          stripped back, cinematic, and charged with blue light.
        </p>

        <a
          href="#contact"
          className="mt-10 inline-flex items-center justify-center border border-blue-500/70 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_28px_rgba(37,99,235,0.35)]"
        >
          Continue
        </a>
      </div>
    </section>
  );
}
