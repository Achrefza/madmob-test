"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

type BleedSlide = {
  id: string;
  postId: string;
  embedPath: "p" | "reel";
  embedUrl: string;
  instagramUrl: string;
};

const INSTAGRAM_POSTS = [
  "https://www.instagram.com/reel/C33LLeNs4Ss/",
  "https://www.instagram.com/p/CwqFnyOMVgn/",
  "https://www.instagram.com/p/Cr6CqO1q-4D/",
  "https://www.instagram.com/p/C4bU11vshv9/",
  "https://www.instagram.com/p/Cy_emahsOR5/",
  "https://www.instagram.com/p/C4_Vgk2L63O/",
  "https://www.instagram.com/reel/CvsZlC1J_vp/",
];

const bleedSlides: BleedSlide[] = INSTAGRAM_POSTS.map((url) => {
  const match = url.match(/instagram\.com\/(p|reel)\/([^/?#]+)\/?/i);

  if (!match) {
    throw new Error(`Invalid Instagram URL: ${url}`);
  }

  const [, embedPath, postId] = match;

  return {
    id: postId.toLowerCase(),
    postId,
    embedPath: embedPath as "p" | "reel",
    embedUrl: `https://www.instagram.com/${embedPath}/${postId}/embed`,
    instagramUrl: `https://www.instagram.com/${embedPath}/${postId}/`,
  };
});

const AUTOPLAY_DELAY = 5000;

const getNeighborIndexes = (index: number) => {
  const previousIndex = (index - 1 + bleedSlides.length) % bleedSlides.length;
  const nextIndex = (index + 1) % bleedSlides.length;

  return [previousIndex, index, nextIndex];
};

type BleedEmbedCardProps = {
  slide: BleedSlide;
  index: number;
  isActive: boolean;
  shouldPreload: boolean;
  shouldMountEmbed: boolean;
  onInteract: (duration?: number) => void;
};

const BleedEmbedCard = memo(function BleedEmbedCard({
  slide,
  index,
  isActive,
  shouldPreload,
  shouldMountEmbed,
  onInteract,
}: BleedEmbedCardProps) {
  return (
    <div
      className={`ig-embed-transition absolute inset-0 flex translate-z-0 items-center justify-center px-4 py-4 sm:px-6 ${
        isActive
          ? "pointer-events-auto z-10 translate-y-0 scale-100 opacity-100 blur-0"
          : shouldPreload
            ? "pointer-events-none z-0 translate-y-2 scale-[0.985] opacity-0 blur-sm"
            : "pointer-events-none z-0 -translate-y-2 scale-[0.985] opacity-0 blur-sm"
      }`}
      aria-hidden={!isActive}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />

        <div
          className={`ig-embed-transition flex w-full max-w-[350px] justify-center sm:max-w-[420px] ${
            isActive ? "animate-[madmobFloat_6s_cubic-bezier(0.22,1,0.36,1)_infinite] scale-100" : "scale-[0.985]"
          }`}
        >
          <div
            className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl"
            onTouchStart={() => onInteract()}
            onMouseDown={() => onInteract()}
          >
            {shouldMountEmbed ? (
              <iframe
                src={slide.embedUrl}
                title={`Instagram bleed post ${index + 1}`}
                className={`ig-embed-transition h-[520px] w-full rounded-xl shadow-[0_0_40px_rgba(0,120,255,0.15)] ${
                  isActive ? "shadow-[0_0_60px_rgba(0,120,255,0.2)]" : ""
                }`}
                scrolling="no"
                loading={isActive || shouldPreload ? "eager" : "lazy"}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            ) : (
              <div className="h-[520px] w-full rounded-xl bg-black" aria-hidden="true" />
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] bg-[linear-gradient(to_top,rgba(0,0,0,0.82),rgba(0,0,0,0.36),transparent)] shadow-[inset_0_-40px_80px_rgba(0,120,255,0.12)]" />

            <div className="pointer-events-none absolute bottom-0 left-0 z-10 flex w-full items-center justify-between bg-black/70 px-4 py-3 backdrop-blur-md">
              <span className="pointer-events-none text-xs tracking-wide text-white/60">View on Instagram</span>

              <a
                href={slide.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="font-buttons group relative inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 pointer-events-auto hover:scale-[1.03] hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(0,120,255,0.35)] focus-visible:scale-[1.03] focus-visible:border-white/20 focus-visible:bg-white/10 focus-visible:shadow-[0_0_25px_rgba(0,120,255,0.35)] motion-reduce:hover:scale-100 motion-reduce:transition-none"
                aria-label="View this bleed post on Instagram"
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

                <span className="absolute bottom-[6px] left-1/2 h-px w-0 -translate-x-1/2 bg-[#0078ff] transition-all duration-300 group-hover:w-3/4 group-focus-visible:w-3/4 group-hover:shadow-[0_0_12px_rgba(0,120,255,0.7)] group-focus-visible:shadow-[0_0_12px_rgba(0,120,255,0.7)]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function BleedSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef<number | null>(null);

  const nextSlideIndex = useMemo(() => (currentSlide + 1) % bleedSlides.length, [currentSlide]);
  const mountedSlideSet = useMemo(() => new Set(getNeighborIndexes(currentSlide)), [currentSlide]);

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

      setCurrentSlide((prev) => (prev + 1) % bleedSlides.length);
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
    setCurrentSlide((prev) => (prev - 1 + bleedSlides.length) % bleedSlides.length);
  }, [handleInteraction]);

  const handleNext = useCallback(() => {
    handleInteraction();
    setCurrentSlide((prev) => (prev + 1) % bleedSlides.length);
  }, [handleInteraction]);

  return (
    <section id="bleed" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28 min-h-[80vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.92))]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="font-madmob text-xs uppercase tracking-[0.35em] text-[#0078ff]">Interlude</p>
          <h2 className="font-madmob mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.30em] text-blue">
            BLEED
          </h2>
          <p className="mt-6 max-w-xl text-zinc-300 leading-relaxed">
            Our in-house brand, BLEED, was created by our designer and has taken the scene by storm. Selling out
            across Tunisia and gaining recognition internationally, BLEED has become a cultural movement, merging
            streetwear with music culture.
          </p>

          <a
            href="#contact"
            className="font-buttons mt-10 inline-flex items-center justify-center border border-[#0078ff]/70 px-8 py-3 text-sm text-white transition duration-300 hover:border-[#0078ff] hover:bg-[#0078ff]/10 hover:shadow-[0_0_28px_rgba(0,120,255,0.35)]"
          >
            Bleed website
          </a>
        </div>

        <div>
          <div
            className="relative h-[520px] overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_0_60px_rgba(0,120,255,0.15)] [touch-action:pan-y] sm:h-[540px]"
            onMouseEnter={() => handleInteraction(3000)}
            onTouchStart={() => handleInteraction()}
            onMouseDown={() => handleInteraction()}
            onWheel={() => handleInteraction(2500)}
          >
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.16),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,120,255,0.2),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(0,120,255,0.08),transparent_35%,rgba(0,120,255,0.12)_70%,transparent)] animate-[madmobGradientShift_12s_ease-in-out_infinite]" />
            <div className="ig-embed-noise pointer-events-none absolute inset-0 z-0 opacity-60" />

            {bleedSlides.map((slide, index) => (
              <BleedEmbedCard
                key={slide.id}
                slide={slide}
                index={index}
                isActive={index === currentSlide}
                shouldPreload={index === nextSlideIndex}
                shouldMountEmbed={mountedSlideSet.has(index)}
                onInteract={handleInteraction}
              />
            ))}

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
            {bleedSlides.map((slide, index) => (
              <button
                key={`${slide.id}-indicator`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white shadow-[0_0_10px_rgba(0,120,255,0.8)]" : "bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
