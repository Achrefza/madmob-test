"use client";

import Image from "next/image";
import { useState } from "react";

const images = ["/images/bleed/1.webp", "/images/bleed/2.webp", "/images/bleed/3.webp"];

export default function BleedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
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
            A Silent Frame Before the Next Impact
          </h2>
          <p className="mt-6 text-zinc-300 leading-relaxed max-w-xl">
            Between noise and movement, we hold space for tension, clarity, and intent. This pause is part of the
            narrative—stripped back, cinematic, and charged with blue light.
          </p>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center justify-center border border-blue-500/70 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_28px_rgba(37,99,235,0.35)]"
          >
            Continue
          </a>
        </div>

        <div className="relative overflow-hidden rounded-lg h-[420px] border border-white/10">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image) => (
              <div key={image} className="relative h-full w-full flex-shrink-0 overflow-hidden">
                <Image src={image} alt="Bleed cinematic slide" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />

          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/70 bg-black/70 text-white transition hover:border-blue-400 hover:bg-blue-500/20"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/70 bg-black/70 text-white transition hover:border-blue-400 hover:bg-blue-500/20"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
