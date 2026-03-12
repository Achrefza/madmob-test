"use client";

import { useEffect, useState } from "react";

const coverSlides = [
  "/images/backgrounds/cover1.webp",
  "/images/backgrounds/cover2.webp",
  "/images/backgrounds/cover3.webp",
  "/images/backgrounds/cover4.webp",
];

export default function MusicCoversSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + coverSlides.length) % coverSlides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
  };

  return (
    <section id="music-covers" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28 min-h-[80vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.92))]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-madmob mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-blue">
            Music Covers
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-zinc-300">&nbsp;</p>
        </div>

        <div>
          <div className="relative h-[420px] overflow-hidden rounded-lg border border-white/10 bg-black">
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.16),transparent_60%)]" />

            {coverSlides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <div
                  key={slide}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                >
                  <img
                    src={slide}
                    alt={`Music cover slide ${index + 1}`}
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/60 text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/60 text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {coverSlides.map((slide, index) => (
              <button
                key={`${slide}-indicator`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
