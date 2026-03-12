"use client";

import { useEffect, useState } from "react";

const videoClips = [
  {
    src: "https://www.youtube.com/embed/NC7Gx6R0Reo",
    image: "https://img.youtube.com/vi/NC7Gx6R0Reo/maxresdefault.jpg",
    title: "A.L.A - Ya Ghali (Official Music Video)",
  },
  {
    src: "https://www.youtube.com/embed/Rug85eDybfs",
    image: "https://img.youtube.com/vi/Rug85eDybfs/maxresdefault.jpg",
    title: "XIIVI - LESSGO (Official Music Video)",
  },
  {
    src: "https://www.youtube.com/embed/fRqk3TDk_c0",
    image: "https://img.youtube.com/vi/fRqk3TDk_c0/maxresdefault.jpg",
    title: "KTYB X Madmob - ANANAYA (Official Music Video)",
  },
  {
    src: "https://www.youtube.com/embed/IXPu3Z_u98U",
    image: "https://img.youtube.com/vi/IXPu3Z_u98U/maxresdefault.jpg",
    title: "Dabl De x Fahed — عكس الموج",
  },
  {
    src: "https://www.youtube.com/embed/3FpdR-LKfDY",
    image: "https://img.youtube.com/vi/3FpdR-LKfDY/maxresdefault.jpg",
    title: "KTYB X EMP1RE — BAYAN",
  },
];

export default function VideoClipsSection() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("Video clip");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideoModal = (source: string, title: string) => {
    setVideoSrc(`${source}?autoplay=1&modestbranding=1&rel=0`);
    setVideoTitle(title);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setVideoSrc(null);
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeVideoModal();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <section id="video-clips" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.88))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="font-madmob mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.25em] text-blue">
          Video      Clips
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {videoClips.map((video) => (
            <article
              key={video.src}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-900/95 via-black to-zinc-900/70 transition-all duration-500 hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
              onClick={() => openVideoModal(video.src, video.title)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openVideoModal(video.src, video.title);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-video overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${video.image})` }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 transition-all duration-500 group-hover:opacity-90">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/45 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <span className="ml-1 text-xl text-white/90">▶</span>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-base text-white sm:text-lg">{video.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          style={{ animation: "madfestModalFadeIn 220ms ease-out" }}
          onClick={closeVideoModal}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-full max-w-[1100px]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={closeVideoModal}
              className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900/90 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-zinc-700"
              aria-label="Close video clip"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
              <iframe
                className="h-full w-full"
                src={videoSrc ?? undefined}
                title={videoTitle}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
