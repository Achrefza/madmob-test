"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "/images/backgrounds/bleed1.webp",
  "/images/backgrounds/bleed2.webp",
  "/images/backgrounds/bleed3.webp",
  "/images/backgrounds/bleed4.webp",
  "/images/backgrounds/bleed5.webp",
];

export default function BleedSection() {
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
      className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28 min-h-[80vh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.92))]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 items-center lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Interlude</p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Brand &amp; Merch: BLEED
          </h2>
          <p className="mt-6 text-zinc-300 leading-relaxed max-w-xl">
            Our in-house brand, BLEED, was created by our designer and has taken the scene by storm. Selling out
            across Tunisia and gaining recognition internationally, BLEED has become a cultural movement, merging
            streetwear with music culture.
          </p>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center justify-center border border-blue-500/70 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_28px_rgba(37,99,235,0.35)]"
          >
            Continue
          </a>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-lg h-[420px] border border-white/10">
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.22),transparent_60%)]" />

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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500 bg-black/60 text-blue-500 backdrop-blur transition-all duration-300 hover:bg-blue-500/20"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500 bg-black/60 text-blue-500 backdrop-blur transition-all duration-300 hover:bg-blue-500/20"
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
                  index === currentSlide ? "bg-blue-500" : "bg-zinc-600"
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
