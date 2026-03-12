"use client";

import { useEffect, useRef, useState } from "react";

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
    image: "/images/backgrounds/madfest.webp",
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
    image: "/images/backgrounds/alternative.webp",
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
    video: "https://www.youtube.com/embed/ki4ezofcR00",
  },
];

export default function ProjectsSection() {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() => projects.map(() => false));
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("Project video");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

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
              aria-label="Close project video"
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
