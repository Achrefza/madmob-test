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
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<number | null>(null);

  const nextSlideIndex = useMemo(() => (currentSlide + 1) % coverSlides.length, [currentSlide]);

  const scheduleAutoplayResume = useCallback((duration = AUTOPLAY_DELAY) => {
    setIsPaused(true);

    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, duration);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isPaused) {
        return;
      }

      setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      scheduleAutoplayResume();
      setCurrentSlide(index);
    },
    [scheduleAutoplayResume],
  );

  const handlePrevious = useCallback(() => {
    scheduleAutoplayResume();
    setCurrentSlide((prev) => (prev - 1 + coverSlides.length) % coverSlides.length);
  }, [scheduleAutoplayResume]);

  const handleNext = useCallback(() => {
    scheduleAutoplayResume();
    setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
  }, [scheduleAutoplayResume]);

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
            onMouseEnter={() => scheduleAutoplayResume()}
            onMouseLeave={() => scheduleAutoplayResume()}
            onTouchStart={() => scheduleAutoplayResume()}
            onWheel={() => scheduleAutoplayResume()}
            onClick={() => scheduleAutoplayResume()}
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
                  className={`absolute inset-0 flex items-center justify-center px-4 py-4 transition-all duration-700 ease-in-out sm:px-6 ${
                    isActive
                      ? "opacity-100 blur-0 scale-100 pointer-events-auto z-10"
                      : shouldPreload
                        ? "opacity-0 blur-sm scale-[0.98] pointer-events-none z-0"
                        : "opacity-0 blur-sm scale-95 pointer-events-none z-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40 pointer-events-none" />

                    <div
                      className={`w-full max-w-[350px] sm:max-w-[420px] flex justify-center transition-all duration-700 ease-in-out ${
                        isActive
                          ? "animate-[madmobFloat_6s_ease-in-out_infinite] scale-100"
                          : shouldPreload
                            ? "scale-[0.98]"
                            : "scale-95"
                      }`}
                    >
                      <iframe
                        src={slide.embedUrl}
                        title={`Instagram music cover ${index + 1}`}
                        className={`h-[480px] w-full rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-700 ease-in-out sm:h-[520px] ${
                          isActive ? "shadow-[0_0_60px_rgba(255,0,0,0.2)]" : ""
                        }`}
                        scrolling="no"
                        loading={isActive || shouldPreload ? "eager" : "lazy"}
                      />
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
