export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-10 pointer-events-none bg-black/60" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/30 via-black/60 to-black" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(205,28,24,0.16)_0,_rgba(205,28,24,0)_50%)]" />

      <div
        aria-hidden="true"
        className="wire-layer wire-layer--top"
      />
      <div
        aria-hidden="true"
        className="wire-layer wire-layer--bottom"
      />

      <div className="relative z-20 max-w-5xl text-center">
        <div className="mx-auto mb-6 h-[2px] w-20 bg-[var(--accent-red)]" />
        <h1 className="mx-auto max-w-[90vw] text-center font-madmob text-[clamp(3rem,10vw,8rem)] text-white">
          MADMOB
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg"></p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-400">
        <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <span className="h-8 w-[1px] bg-[var(--accent-red)]/80" />
      </div>

      <style jsx>{`
        .wire-layer {
          position: absolute;
          left: 50%;
          width: 120%;
          height: 130px;
          transform: translateX(-50%);
          opacity: 0.18;
          filter: blur(0.4px);
          pointer-events: none;
          z-index: 11;
          mix-blend-mode: soft-light;
          background-image: url('/backgrounds/barbedwire.png');
          background-repeat: repeat-x;
          background-position: center;
          background-size: auto 100%;
          animation: wireDrift 38s ease-in-out infinite alternate;
        }

        .wire-layer--top {
          top: calc(50% - clamp(3.75rem, 8vw, 6rem));
        }

        .wire-layer--bottom {
          top: calc(50% + clamp(3.75rem, 8vw, 6rem));
        }

        @keyframes wireDrift {
          from {
            background-position-x: 47%;
          }
          to {
            background-position-x: 53%;
          }
        }
      `}</style>
    </section>
  );
}
