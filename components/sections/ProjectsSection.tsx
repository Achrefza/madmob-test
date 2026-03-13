"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const projects = [
  {
    title: "Annual Festival: MADFEST",
    description:
      "From 2020 to 2022, MADFEST ran as a two-day festival with 1,000–1,200 attendees and lineups of up to 12 rappers per edition.",
    image: "/images/backgrounds/madfest.webp",
    video: "https://www.youtube.com/embed/UFpmdPuqVOA",
  },
  {
    title: "MADFEST 2K21 SET",
    description: "Live MADFEST 2K21 set performance.",
    image: "https://img.youtube.com/vi/J8Udp3QVqm0/maxresdefault.jpg",
    video: "https://www.youtube.com/embed/J8Udp3QVqm0",
  },
  {
    title: "Royal Rumble",
    description: "Held on 15 Feb 2020, this high-energy battle-style music event spotlighted underground talent.",
    image: "/images/backgrounds/royalrumble.webp",
    video: "https://www.youtube.com/embed/vFel4jMDOrw",
  },
  {
    title: "ALTERNATIVE (DJ Set)",
    description: "In 2024, MADMOB hosted an intimate DJ set session at TBRL Studio.",
    image: "https://img.youtube.com/vi/OHimhB1eKGI/maxresdefault.jpg",
    video: "https://www.youtube.com/embed/OHimhB1eKGI",
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
    video: "https://www.youtube.com/embed/ki4ezofcR00",
  },
];

export default function ProjectsSection() {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() => projects.map(() => false));
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalMounted, setIsModalMounted] = useState(false);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const openVideoModal = (source: string, title: string) => {
    setIsModalMounted(true);
    setActiveVideo({
      src: `${source}?autoplay=1&modestbranding=1&rel=0`,
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
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-all duration-300 ease-out ${
              isModalVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={closeVideoModal}
            aria-modal="true"
            role="dialog"
          >
            <div
              className={`relative aspect-video w-[92vw] max-w-4xl overflow-hidden rounded-lg shadow-2xl shadow-[0_0_40px_rgba(255,0,0,0.15)] transition-all duration-[320ms] ease-out ${
                isModalVisible ? "scale-100 opacity-100" : "scale-[0.92] opacity-0"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeVideoModal}
                className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/90 text-xl text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-zinc-700"
                aria-label="Close project video"
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
          {projects.map((project, index) => (
            <article
              key={project.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              data-project-index={index}
              className={`group relative h-52 overflow-hidden border border-white/10 bg-zinc-900 ${
                project.video ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                if (project.video) {
                  openVideoModal(project.video, project.title);
                }
              }}
              onKeyDown={(event) => {
                if (!project.video) {
                  return;
                }

                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openVideoModal(project.video, project.title);
                }
              }}
              role={project.video ? "button" : undefined}
              tabIndex={project.video ? 0 : undefined}
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
          ))}
        </div>
      </div>
      </section>
      {videoModal}
    </>
  );
}
