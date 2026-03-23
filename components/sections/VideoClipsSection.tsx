"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type VideoClip = {
  id: string;
  title: string;
  fallbackTitle: string;
};

const videoClips: VideoClip[] = [
  {
    id: "NC7Gx6R0Reo",
    title: "A.L.A - Ya Ghali (Official Music Video)",
    fallbackTitle: "A.L.A - Ya Ghali (Official Music Video)",
  },
  {
    id: "Rug85eDybfs",
    title: "XIIVI - LESSGO (Official Music Video)",
    fallbackTitle: "XIIVI - LESSGO (Official Music Video)",
  },
  {
    id: "fRqk3TDk_c0",
    title: "KTYB X Madmob - ANANAYA (Official Music Video)",
    fallbackTitle: "KTYB X Madmob - ANANAYA (Official Music Video)",
  },
  {
    id: "IXPu3Z_u98U",
    title: "Dabl De x Fahed — عكس الموج",
    fallbackTitle: "Dabl De x Fahed — عكس الموج",
  },
  {
    id: "3FpdR-LKfDY",
    title: "KTYB X EMP1RE — BAYAN",
    fallbackTitle: "KTYB X EMP1RE — BAYAN",
  },
  {
    id: "gSCT94Sm-FY",
    title: "Video Clip 01",
    fallbackTitle: "Video Clip 01",
  },
  {
    id: "7nVVL7uLeFY",
    title: "Video Clip 02",
    fallbackTitle: "Video Clip 02",
  },
  {
    id: "UkFmHiDxCkA",
    title: "Video Clip 03",
    fallbackTitle: "Video Clip 03",
  },
  {
    id: "RfODj1d9mGU",
    title: "Video Clip 04",
    fallbackTitle: "Video Clip 04",
  },
  {
    id: "qeCMrm2OtZ8",
    title: "Video Clip 05",
    fallbackTitle: "Video Clip 05",
  },
  {
    id: "pHBaowRWOqk",
    title: "Video Clip 06",
    fallbackTitle: "Video Clip 06",
  },
];

const getMaxResThumbnail = (videoId: string) => `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
const getFallbackThumbnail = (videoId: string) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

type VideoClipCardProps = {
  onOpen: (videoId: string, title: string) => void;
  video: VideoClip;
};

function VideoClipCard({ onOpen, video }: VideoClipCardProps) {
  const [thumbnailSrc, setThumbnailSrc] = useState(() => getMaxResThumbnail(video.id));


  return (
    <article
      className="group relative translate-z-0 transform-gpu cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-900/95 via-black to-zinc-900/70 will-change-transform transition-all duration-500 ease-out hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
      onClick={() => onOpen(video.id, video.title)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(video.id, video.title);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full translate-z-0 object-cover will-change-transform transition-transform duration-500 ease-out group-hover:scale-105"
          src={thumbnailSrc}
          alt={video.title}
          onError={() => {
            if (thumbnailSrc !== getFallbackThumbnail(video.id)) {
              setThumbnailSrc(getFallbackThumbnail(video.id));
            }
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 transition-all duration-500 ease-out group-hover:opacity-90">
          <div className="flex h-16 w-16 translate-z-0 items-center justify-center rounded-full border border-white/30 bg-black/55 will-change-transform transition-transform duration-500 ease-out group-hover:scale-110">
            <svg
              aria-hidden="true"
              className="ml-1 h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.85l8.49-5.18a1 1 0 0 0 0-1.7L9.54 5.97A1 1 0 0 0 8 6.82Z" />
            </svg>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-base text-white sm:text-lg">{video.title}</h3>
        </div>
      </div>
    </article>
  );
}

export default function VideoClipsSection() {
  const [videos, setVideos] = useState(videoClips);
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalMounted, setIsModalMounted] = useState(false);


  useEffect(() => {
    let isMounted = true;

    const fetchTitles = async () => {
      const updatedVideos = await Promise.all(
        videoClips.map(async (video) => {
          try {
            const response = await fetch(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.id}&format=json`,
            );

            if (!response.ok) {
              throw new Error(`Failed to fetch title for ${video.id}`);
            }

            const data = (await response.json()) as { title?: string };

            return {
              ...video,
              title: data.title?.trim() || video.fallbackTitle,
            };
          } catch {
            return {
              ...video,
              title: video.fallbackTitle,
            };
          }
        }),
      );

      if (isMounted) {
        setVideos(updatedVideos);
      }
    };

    void fetchTitles();

    return () => {
      isMounted = false;
    };
  }, []);

  const openVideoModal = (videoId: string, title: string) => {
    setIsModalMounted(true);
    setActiveVideo({
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`,
      title,
    });
  };

  const closeVideoModal = () => {
    setIsModalVisible(false);
    setActiveVideo(null);
  };

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsModalVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeVideo]);

  useEffect(() => {
    if (activeVideo || isModalVisible || !isModalMounted) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsModalMounted(false);
    }, 320);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeVideo, isModalVisible, isModalMounted]);

  useEffect(() => {
    if (!activeVideo) {
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
  }, [activeVideo]);

  const videoModal =
    isModalMounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-all duration-500 ease-out ${
              isModalVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={closeVideoModal}
            aria-modal="true"
            role="dialog"
          >
            <div
              className={`relative aspect-video w-[92vw] max-w-4xl translate-z-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 will-change-transform transition-all duration-500 ease-out ${
                isModalVisible ? "scale-100 opacity-100" : "scale-[0.92] opacity-0"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeVideoModal}
                className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/90 text-xl text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-zinc-700"
                aria-label="Close video clip"
              >
                ×
              </button>

              {activeVideo ? (
                <iframe
                  className="h-full w-full"
                  src={activeVideo.src}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <section id="video-clips" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28 translate-z-0 will-change-transform">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.88))]" />

      <div className="relative z-10 mx-auto max-w-6xl translate-z-0 will-change-transform">
        <h2 className="font-madmob mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.25em] text-blue">
          Video      Clips
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoClipCard key={video.id} video={video} onOpen={openVideoModal} />
          ))}
        </div>
      </div>
      {videoModal}
    </section>
  );
}
