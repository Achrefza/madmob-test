"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProjectVideo = {
  id: string;
  title: string;
};

type Project = {
  title: string;
  description: string;
  image?: string;
  videos?: ProjectVideo[];
};

const getYouTubeEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

const getYouTubeThumbnailUrl = (videoId: string) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

const projects: Project[] = [
  {
    title: "Annual Festival: MADFEST",
    description:
      "From 2020 to 2022, MADFEST ran as a two-day festival with 1,000–1,200 attendees and lineups of up to 12 rappers per edition.",
    image: "/images/backgrounds/madfest.webp",
    videos: [{ id: "UFpmdPuqVOA", title: "Annual Festival: MADFEST" }],
  },
  {
    title: "MADFEST 2K21 SET",
    description: "Live MADFEST 2K21 set performance.",
    image: "https://img.youtube.com/vi/J8Udp3QVqm0/maxresdefault.jpg",
    videos: [{ id: "J8Udp3QVqm0", title: "MADFEST 2K21 SET" }],
  },
  {
    title: "Royal Rumble",
    description: "Held on 15 Feb 2020, this high-energy battle-style music event spotlighted underground talent.",
    image: "/images/backgrounds/royalrumble.webp",
    videos: [{ id: "vFel4jMDOrw", title: "Royal Rumble" }],
  },
  {
    title: "ALTERNATIVE (DJ Set)",
    description: "In 2024, MADMOB hosted an intimate DJ set session at TBRL Studio.",
    image: "https://img.youtube.com/vi/OHimhB1eKGI/maxresdefault.jpg",
    videos: [{ id: "OHimhB1eKGI", title: "ALTERNATIVE (DJ Set)" }],
  },
  {
    title: "Club Residency — Zebra Club",
    description: "A weekly Sunday residency with ALA, one of Tunisia’s leading rap voices.",
    image: "/images/backgrounds/zebra.webp",
  },
  {
    title: "Gimic Radio Residency",
    description: "From 2022 to 2023, MADMOB held a radio residency in Brussels, Belgium.",
    image: "https://img.youtube.com/vi/ki4ezofcR00/maxresdefault.jpg",
    videos: [
      { id: "ki4ezofcR00", title: "Gimic Radio Residency — Session 1" },
      { id: "qeCMrm2OtZ8", title: "Gimic Radio Residency — Session 2" },
    ],
  },
];

export default function ProjectsSection() {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() => projects.map(() => false));
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalMounted, setIsModalMounted] = useState(false);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const openVideoPlayer = (video: ProjectVideo) => {
    setSelectedProject(null);
    setIsModalMounted(true);
    setActiveVideo({
      src: getYouTubeEmbedUrl(video.id),
      title: video.title,
    });
  };

  const handleProjectOpen = (project: Project) => {
    if (!project.videos?.length) {
      return;
    }

    if (project.videos.length === 1) {
      openVideoPlayer(project.videos[0]);
      return;
    }

    setActiveVideo(null);
    setSelectedProject(project);
    setIsModalMounted(true);
  };

  const closeVideoModal = () => {
    setIsModalVisible(false);
    setActiveVideo(null);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!activeVideo && !selectedProject) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsModalVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeVideo, selectedProject]);

  useEffect(() => {
    if (activeVideo || selectedProject || isModalVisible || !isModalMounted) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsModalMounted(false);
    }, 320);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeVideo, selectedProject, isModalVisible, isModalMounted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const indexValue = entry.target.getAttribute("data-project-index");
          if (indexValue === null) {
            return;
          }

          const index = Number(indexValue);
          setRevealedCards((previous) => {
            if (previous[index]) {
              return previous;
            }

            const next = [...previous];
            next[index] = true;
            return next;
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeVideo && !selectedProject) {
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
  }, [activeVideo, selectedProject]);

  const videoModal =
    isModalMounted && typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-all duration-300 ease-out ${
              isModalVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={closeVideoModal}
            aria-modal="true"
            role="dialog"
          >
            <div
              className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-[320ms] ease-out ${
                isModalVisible ? "scale-100 opacity-100" : "scale-[0.92] opacity-0"
              } ${activeVideo ? "aspect-video" : "max-h-[85vh]"}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeVideoModal}
                className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/90 text-xl text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-zinc-700"
                aria-label={activeVideo ? "Close project video" : "Close video selection"}
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
              ) : selectedProject ? (
                <div className="p-5 sm:p-6">
                  <div className="pr-12">
                    <p className="text-xs font-semibold tracking-[0.3em] text-[var(--accent-red)] uppercase">
                      Choose a set
                    </p>
                    <h3 className="mt-3 text-2xl text-white sm:text-3xl">{selectedProject.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">{selectedProject.description}</p>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {selectedProject.videos?.map((video, index) => (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => openVideoPlayer(video)}
                        className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-900/90 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={getYouTubeThumbnailUrl(video.id)}
                            alt={video.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] tracking-[0.2em] text-white/80 uppercase">
                            Video {index + 1}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/55 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                              <svg aria-hidden="true" className="ml-1 h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.85l8.49-5.18a1 1 0 0 0 0-1.7L9.54 5.97A1 1 0 0 0 8 6.82Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-white sm:text-base">{video.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <section id="projects" className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: "url('/images/backgrounds/backjourney.webp')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.85),rgba(0,0,0,0.95))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="font-madmob text-xs tracking-[0.25em] text-[var(--accent-red)] uppercase">T h e   J o u r n e y</p>
          <h2 className="font-madmob mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.25em] text-blue">Djing and fests </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const hasVideos = Boolean(project.videos?.length);
            const videoCount = project.videos?.length ?? 0;

            return (
            <article
              key={project.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              data-project-index={index}
              className={`group relative h-52 overflow-hidden border border-white/10 bg-zinc-900 ${
                hasVideos ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                if (hasVideos) {
                  handleProjectOpen(project);
                }
              }}
              onKeyDown={(event) => {
                if (!hasVideos) {
                  return;
                }

                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleProjectOpen(project);
                }
              }}
              role={hasVideos ? "button" : undefined}
              tabIndex={hasVideos ? 0 : undefined}
            >
              {project.image ? (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-100 translate-y-0 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:translate-y-[-6px]"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(145deg,#191919,#050505)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#191919,#050505)] opacity-70" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,var(--accent-red),transparent_45%)] transition-all duration-500 ease-out group-hover:opacity-60" />
              {videoCount > 1 ? (
                <div className="absolute top-3 right-3 z-10 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-white/85 uppercase backdrop-blur-sm">
                  {videoCount} videos
                </div>
              ) : null}
              <div className="absolute inset-0 flex items-end p-4">
                <div className="translate-y-2 transition-all duration-500 ease-out group-hover:translate-y-0">
                  <h3 className="text-lg text-white">{project.title}</h3>
                  <p
                    className={`mt-2 text-sm text-zinc-400 transition-all duration-500 ease-out ${
                      revealedCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
      {videoModal}
      </section>
    </>
  );
}
