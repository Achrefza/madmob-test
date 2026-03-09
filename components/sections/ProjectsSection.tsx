"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Annual Festival: MADFEST",
    description:
      "From 2020 to 2022, MADFEST ran as a two-day festival with 1,000–1,200 attendees and lineups of up to 12 rappers per edition.",
    image: "/images/backgrounds/madfest.webp",
  },
  {
    title: "Royal Rumble",
    description: "Held on 15 Feb 2020, this high-energy battle-style music event spotlighted underground talent.",
    image: "/images/backgrounds/royalrumble.webp",
  },
  {
    title: "ALTERNATIVE (DJ Set)",
    description: "In 2024, MADMOB hosted an intimate DJ set session at TBRL Studio.",
    image: "/images/backgrounds/alternative.webp",
  },
  {
    title: "Club Residency — Zebra Club",
    description: "A weekly Sunday residency with ALA, one of Tunisia’s leading rap voices.",
    image: "/images/backgrounds/zebra.webp",
  },
  {
    title: "Club DJ Events — Club Gingembre",
    description: "Regular DJ takeovers that helped push and amplify the underground hip-hop scene.",
  },
  {
    title: "Club Nights — Cocoon & Lotus Club",
    description: "Curated DJ nights featuring both international and local artists.",
  },
  {
    title: "MADTALK Podcast",
    description: "Running since 2023, MADTALK explores underground music, industry shifts, and artist stories.",
    image: "/images/backgrounds/madtalk.webp",
  },
  {
    title: "Gimic Radio Residency",
    description: "From 2022 to 2023, MADMOB held a radio residency in Brussels, Belgium.",
  },
];

export default function ProjectsSection() {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() => projects.map(() => false));
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

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

  return (
    <section id="projects" className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: "url('/images/backgrounds/backjourney.webp')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.85),rgba(0,0,0,0.95))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.35em] text-[var(--accent-red)] uppercase">Milestones</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">The Mob’s Journey</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              data-project-index={index}
              className="group relative h-52 overflow-hidden border border-white/10 bg-zinc-900"
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
  );
}
