"use client";

import { useEffect, useRef, useState } from "react";

const artists = [
  {
    name: "ALA",
    description: "Longtime MADMOB collaborator known for high-impact live sets and sharp lyricism.",
    image: "/images/backgrounds/ala.webp",
  },
  {
    name: "KTYB",
    description: "A bold underground voice collaborating with the collective on forward-thinking sessions.",
    image: "/images/backgrounds/ktyb.webp",
  },
  {
    name: "STOU",
    description: "Part of MADMOB collaborative projects, blending raw presence with modern rap aesthetics.",
    image: "/images/backgrounds/stou.webp",
  },
  {
    name: "MIZO-H",
    description: "Frequent creative partner contributing performance energy and distinct artistic identity.",
    image: "/images/backgrounds/mizo-h.webp",
  },
  {
    name: "DVARK BOY",
    description: "A recurring collaborator helping shape MADMOB events through expressive underground style.",
    image: "/images/backgrounds/dvarkboy.webp",
  },
  {
    name: "DOPEMAN",
    description: "Collaborated with MADMOB across live moments and community-driven creative activations.",
    image: "/images/backgrounds/dopeman.webp",
  },
];

export default function CollaborationsSection() {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() => artists.map(() => false));
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const indexValue = entry.target.getAttribute("data-artist-index");
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
    <section id="collaborations" className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.35em] text-[var(--accent-red)] uppercase">Collaborations</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Artists Who Collaborated With The Mob
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist, index) => (
            <article
              key={artist.name}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              data-artist-index={index}
              className="group relative h-52 overflow-hidden border border-white/10 bg-zinc-900"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-100 translate-y-0 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:translate-y-[-6px]"
                style={{ backgroundImage: `url(${artist.image})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#191919,#050505)] opacity-70" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,var(--accent-red),transparent_45%)] transition-all duration-500 ease-out group-hover:opacity-60" />
              <div className="absolute inset-0 flex items-end p-4">
                <div className="translate-y-2 transition-all duration-500 ease-out group-hover:translate-y-0">
                  <h3 className="text-lg text-white">{artist.name}</h3>
                  <p
                    className={`mt-2 text-sm text-zinc-400 transition-all duration-500 ease-out ${
                      revealedCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                  >
                    {artist.description}
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
