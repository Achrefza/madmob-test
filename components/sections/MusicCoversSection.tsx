"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type CoverSlide = {
  id: string;
  postId: string;
  href: string;
};

const coverSlides: CoverSlide[] = [
  {
    id: "dbjcykoodzw",
    postId: "DBjcyKOOdZw",
    href: "https://www.instagram.com/p/DBjcyKOOdZw/",
  },
  {
    id: "c8djn1bkzfs",
    postId: "C8dJN1BKzfS",
    href: "https://www.instagram.com/p/C8dJN1BKzfS/",
  },
  {
    id: "c9u-lm1u5cv",
    postId: "C9u-lM1u5CV",
    href: "https://www.instagram.com/p/C9u-lM1u5CV/",
  },
  {
    id: "c9r-ds9qgol",
    postId: "C9r-dS9qgoL",
    href: "https://www.instagram.com/p/C9r-dS9qgoL/",
  },
  {
    id: "c95gecoktvp",
    postId: "C95GEcoKtVp",
    href: "https://www.instagram.com/p/C95GEcoKtVp/",
  },
  {
    id: "cpahucdqczl",
    postId: "CpAHUcdqCzl",
    href: "https://www.instagram.com/p/CpAHUcdqCzl/",
  },
  {
    id: "clmeixjuvrf",
    postId: "ClMeIxJuvRf",
    href: "https://www.instagram.com/p/ClMeIxJuvRf/",
  },
  {
    id: "ckq7d_zqqa7",
    postId: "CkQ7D_ZqqA7",
    href: "https://www.instagram.com/p/CkQ7D_ZqqA7/",
  },
  {
    id: "cn2idcwkvh9",
    postId: "Cn2idCWKvH9",
    href: "https://www.instagram.com/p/Cn2idCWKvH9/",
  },
  {
    id: "dh_w6nhogwy",
    postId: "DH_w6nhOGwY",
    href: "https://www.instagram.com/p/DH_w6nhOGwY/",
  },
  {
    id: "dprhki_dpfv",
    postId: "DPrhKi_DPfv",
    href: "https://www.instagram.com/p/DPrhKi_DPfv/",
  },
  {
    id: "cpbvh_uq7pu",
    postId: "CpBVHU_q7pu",
    href: "https://www.instagram.com/p/CpBVHU_q7pu/",
  },
];

const getInstagramMediaUrl = (postId: string) => `https://www.instagram.com/p/${postId}/media/?size=l`;

export default function MusicCoversSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState<CoverSlide | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (activeSlide || isModalVisible) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide, isModalVisible]);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => {
      setActiveSlide(null);
    }, 320);
  }, []);

  useEffect(() => {
    if (!activeSlide) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeSlide, closeModal]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + coverSlides.length) % coverSlides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % coverSlides.length);
  };

  const openModal = (slide: CoverSlide) => {
    setActiveSlide(slide);
    window.setTimeout(() => {
      setIsModalVisible(true);
    }, 10);
  };

  const modal =
    activeSlide && typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-300 ease-out sm:p-6 ${
              isModalVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={closeModal}
            role="presentation"
          >
            <div
              className={`relative w-full max-w-3xl transition-all duration-[320ms] ease-out ${
                isModalVisible ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
              }`}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Music cover preview"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-xl text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-black/80"
                aria-label="Close cover preview"
              >
                ✕
              </button>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-2xl shadow-[0_0_60px_rgba(255,0,0,0.12)]">
                <img
                  src={getInstagramMediaUrl(activeSlide.postId)}
                  alt="Expanded music cover"
                  className="h-auto max-h-[85vh] w-full object-contain"
                />
                <div className="flex items-center justify-center border-t border-white/10 bg-black/60 px-4 py-4 backdrop-blur-md">
                  <a
                    href={activeSlide.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium tracking-[0.2em] text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    OPEN ON INSTAGRAM
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
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
            <div className="relative h-[420px] overflow-hidden rounded-lg border border-white/10 bg-black">
              <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.16),transparent_60%)]" />

              {coverSlides.map((slide, index) => {
                const isActive = index === currentSlide;

                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => openModal(slide)}
                      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 hover:shadow-[0_0_25px_rgba(255,0,0,0.3)]"
                      aria-label={`Open music cover ${index + 1}`}
                    >
                      <img
                        src={getInstagramMediaUrl(slide.postId)}
                        alt={`Music cover slide ${index + 1}`}
                        className={`h-full w-full object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-110 ${
                          isActive ? "scale-105" : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/40 transition duration-500 group-hover:bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white text-lg text-white backdrop-blur-md">
                          ▶
                        </div>
                      </div>
                    </button>
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

      {modal}
    </>
  );
}
