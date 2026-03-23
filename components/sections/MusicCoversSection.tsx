"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CoverSlide = {
  id: string;
  embedUrl: string;
};

const coverSlides: CoverSlide[] = [
  "C9r-dS9qgoL",
  "C95GEcoKtVp",
  "CpAHUcdqCzl",
  "ClMeIxJuvRf",
  "CkQ7D_ZqqA7",
  "Cn2idCWKvH9",
  "DH_w6nhOGwY",
  "DPrhKi_DPfv",
  "CpBVHU_q7pu",
].map((postId) => ({
  id: postId.toLowerCase(),
  embedUrl: `https://www.instagram.com/p/${postId}/embed`,
}));

const AUTOPLAY_DELAY = 5000;

export default function MusicCoversSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayResumeAtRef = useRef(0);

  const pauseAutoplay = useCallback((duration = AUTOPLAY_DELAY) => {
    autoplayResumeAtRef.current = Date.now() + duration;
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() < autoplayResumeAtRef.current) {
        return;
      }

      setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      pauseAutoplay();
      setCurrentSlide(index);
    },
    [pauseAutoplay],
  );

  const handlePrevious = useCallback(() => {
    pauseAutoplay();
    setCurrentSlide((prev) => (prev - 1 + coverSlides.length) % coverSlides.length);
  }, [pauseAutoplay]);

  const handleNext = useCallback(() => {
    pauseAutoplay();
    setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
  }, [pauseAutoplay]);

  return (
    <section id="music-covers" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28 min-h-[80vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.92))]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-madmob mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.25em] text-blue">
            MUSIC COVERS
          </h2>
          <p className="mt-6 max-w-xl text-zinc-300 leading-relaxed">
            Our designer <strong>YBA</strong> turns music into visual statements. Every cover is built to reflect the
            sound, the mood, and the culture behind the track. Raw creativity, bold aesthetics, and street energy
            shape each piece of artwork.
          </p>
        </div>

        <div>
          <div
            className="relative overflow-hidden rounded-lg border border-white/10 bg-black h-[520px] sm:h-[540px]"
            onMouseEnter={() => pauseAutoplay()}
            onMouseLeave={() => pauseAutoplay()}
            onTouchStart={() => pauseAutoplay()}
            onWheel={() => pauseAutoplay()}
          >
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.16),transparent_60%)]" />

            {coverSlides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center px-4 py-4 transition-all duration-700 ease-out sm:px-6 ${
                    isActive
                      ? "translate-x-0 opacity-100 pointer-events-auto"
                      : "translate-x-6 opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <iframe
                      src={slide.embedUrl}
                      title={`Instagram music cover ${index + 1}`}
                      className="h-full w-full max-w-[350px] rounded-xl sm:max-w-[400px]"
                      allowTransparency={true}
                      scrolling="no"
                    />
                  </div>
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
                key={`${slide.id}-indicator`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
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
