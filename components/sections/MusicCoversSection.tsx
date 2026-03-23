"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CoverSlide = {
  id: string;
  postId: string;
  embedUrl: string;
};

const INSTAGRAM_POSTS = ["CYNaTMWqpR-","DBjcyKOOdZw","DPrhKi_DPfv","DRm4XXzjLTw","DTsLUGTjOV2","DMDsF8esyuX","C8dJN1BKzfS", "C9u-lM1u5CV", "C9r-dS9qgoL"];

const coverSlides: CoverSlide[] = INSTAGRAM_POSTS.map((postId) => ({
  id: postId.toLowerCase(),
  postId,
  embedUrl: `https://www.instagram.com/p/${postId}/embed`,
}));

const AUTOPLAY_DELAY = 5000;

export default function MusicCoversSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef<number | null>(null);

  const nextSlideIndex = useMemo(() => (currentSlide + 1) % coverSlides.length, [currentSlide]);

  const handleInteraction = useCallback((duration = AUTOPLAY_DELAY) => {
    setIsUserInteracting(true);

    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsUserInteracting(false);
    }, duration);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isUserInteracting) {
        return;
      }

      setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [isUserInteracting]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      handleInteraction();
      setCurrentSlide(index);
    },
    [handleInteraction],
  );

  const handlePrevious = useCallback(() => {
    handleInteraction();
    setCurrentSlide((prev) => (prev - 1 + coverSlides.length) % coverSlides.length);
  }, [handleInteraction]);

  const handleNext = useCallback(() => {
    handleInteraction();
    setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
  }, [handleInteraction]);

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
            className="relative h-[520px] overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_0_60px_rgba(255,0,0,0.15)] [touch-action:pan-y] sm:h-[540px]"
            onMouseEnter={() => handleInteraction(3000)}
            onTouchStart={() => handleInteraction()}
            onMouseDown={() => handleInteraction()}
            onWheel={() => handleInteraction(2500)}
          >
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.16),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(205,28,24,0.2),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(205,28,24,0.08),transparent_35%,rgba(205,28,24,0.12)_70%,transparent)] animate-[madmobGradientShift_12s_ease-in-out_infinite]" />

            {coverSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              const shouldPreload = index === nextSlideIndex;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center px-4 py-4 transition-all duration-700 ease-out sm:px-6 ${
                    isActive
                      ? "opacity-100 blur-0 scale-100 pointer-events-auto z-10"
                      : shouldPreload
                        ? "opacity-0 blur-sm scale-[0.97] pointer-events-none z-0"
                        : "opacity-0 blur-sm scale-[0.97] pointer-events-none z-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40 pointer-events-none" />

                    <div
                      className={`flex w-full max-w-[350px] justify-center transition-all duration-700 ease-out sm:max-w-[420px] ${
                        isActive
                          ? "animate-[madmobFloat_6s_ease-in-out_infinite] scale-100"
                          : shouldPreload
                            ? "scale-[0.97]"
                            : "scale-[0.97]"
                      }`}
                    >
                      <div
                        className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl"
                        onTouchStart={() => handleInteraction()}
                        onMouseDown={() => handleInteraction()}
                      >
                        <iframe
                          src={slide.embedUrl}
                          title={`Instagram music cover ${index + 1}`}
                          className={`h-[520px] w-full rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-700 ease-out ${
                            isActive ? "shadow-[0_0_60px_rgba(255,0,0,0.2)]" : ""
                          }`}
                          scrolling="no"
                          loading={isActive || shouldPreload ? "eager" : "lazy"}
                        />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] bg-gradient-to-t from-black via-black/80 to-transparent" />

                        <div className="pointer-events-none absolute bottom-0 left-0 z-10 flex w-full items-center justify-between bg-black/70 px-4 py-3 backdrop-blur-md">
                          <span className="pointer-events-none text-xs tracking-wide text-white/60">
                            View on Instagram
                          </span>

                          <a
                            href={`https://www.instagram.com/p/${slide.postId}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="font-madmob group relative inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 pointer-events-auto hover:scale-[1.03] hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,0,0,0.25)] focus-visible:scale-[1.03] focus-visible:border-white/20 focus-visible:bg-white/10 focus-visible:shadow-[0_0_20px_rgba(255,0,0,0.25)] motion-reduce:hover:scale-100 motion-reduce:transition-none"
                            aria-label="View this music cover on Instagram"
                          >
                            <svg
                              className="h-4 w-4 opacity-70 transition group-hover:opacity-100 group-focus-visible:opacity-100"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                            </svg>

                            <span className="text-xs uppercase tracking-[0.3em] text-white/70 transition group-hover:text-white group-focus-visible:text-white">
                              View
                            </span>

                            <span className="absolute bottom-[6px] left-1/2 h-px w-0 -translate-x-1/2 bg-red-500 transition-all duration-300 group-hover:w-3/4 group-focus-visible:w-3/4" />
                          </a>
                        </div>
                      </div>
                    </div>
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
