"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";

const slides = [
  "/images/backgrounds/bleed1.webp",
  "/images/backgrounds/bleed2.webp",
  "/images/backgrounds/bleed3.webp",
  "/images/backgrounds/bleed5.webp",
];

export default function BleedSection() {
  const bleedAccent = "#2A6CFF";
  const bleedAccentRgb = "42,108,255";
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      id="bleed"
      style={{
        "--bleed-accent": bleedAccent,
        "--bleed-accent-rgb": bleedAccentRgb,
      } as CSSProperties}
      className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28 min-h-[80vh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,108,255,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.92))]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 items-center lg:grid-cols-2">
        <div>
          <p className="font-madmob text-xs uppercase tracking-[0.35em] text-[var(--bleed-accent)]">Interlude</p>
          <h2 className="font-madmob mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-red">
             BLEED
          </h2>
          <p className="mt-6 text-zinc-300 leading-relaxed max-w-xl">
            Our in-house brand, BLEED, was created by our designer and has taken the scene by storm. Selling out
            across Tunisia and gaining recognition internationally, BLEED has become a cultural movement, merging
            streetwear with music culture.
          </p>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center justify-center border border-[var(--bleed-accent)]/70 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition duration-300 hover:border-[var(--bleed-accent)] hover:bg-[var(--bleed-accent)]/10 hover:shadow-[0_0_28px_rgba(var(--bleed-accent-rgb),0.35)]"
          >
            Bleed website
          </a>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-lg h-[420px] border border-white/10">
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(42,108,255,0.22),transparent_60%)]" />

            {slides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <div
                  key={slide}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                >
                  <Image
                    src={slide}
                    alt={`Bleed cinematic slide ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`h-full w-full object-cover transition-transform duration-[5000ms] ease-out ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  />
                </div>
              );
            })}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />

            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bleed-accent)] bg-black/60 text-[var(--bleed-accent)] backdrop-blur transition-all duration-300 hover:bg-[var(--bleed-accent)]/20"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bleed-accent)] bg-black/60 text-[var(--bleed-accent)] backdrop-blur transition-all duration-300 hover:bg-[var(--bleed-accent)]/20"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((slide, index) => (
              <span
                key={`${slide}-indicator`}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[var(--bleed-accent)]" : "bg-zinc-600"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
