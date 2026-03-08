"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  "Madfest",
  "..",
  "...",
  "....",
  ".....",
  ".......",
];

function useCardReveal(cardCount: number) {
  const [visibleCards, setVisibleCards] = useState(() => Array.from({ length: cardCount }, () => false));
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.getAttribute("data-card-index"));
          if (Number.isNaN(index)) return;

          setVisibleCards((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return { cardRefs, visibleCards };
}

export default function ProjectsSection() {
  const { cardRefs, visibleCards } = useCardReveal(projects.length);

  return (
    <section className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.35em] text-[#ff2a2a] uppercase">Projects</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">The Mob’s Newest</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-card-index={index}
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`group relative h-52 overflow-hidden border border-white/10 bg-zinc-900 transition-all duration-700 ease-out ${
                visibleCards[index] ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-[8px]"
              }`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#191919,#050505)]" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ff2a2a,transparent_45%)] transition-opacity duration-300 group-hover:opacity-50" />
              <div className="absolute inset-0 flex items-end p-4">
                <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-xs tracking-[0.25em] text-zinc-400 uppercase">Project</p>
                  <h3 className="mt-2 text-lg text-white">{project}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
