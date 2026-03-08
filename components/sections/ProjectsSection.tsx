"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Madfest",
    description:
      "A landmark festival bringing together underground artists and global hip-hop culture.",
  },
  {
    title: "Paris Showcase",
    description:
      "A live showcase connecting Tunisian talent with the Paris hip-hop scene.",
  },
  {
    title: "Street Sessions",
    description:
      "Raw live performances filmed in urban spaces across Tunisia.",
  },
  {
    title: "Mob Visual Series",
    description:
      "A collection of cinematic music visuals directed by the collective.",
  },
  {
    title: "Mob Cypher",
    description:
      "A series of freestyle cyphers highlighting emerging voices.",
  },
  {
    title: "Global Collaborations",
    description:
      "Cross-border collaborations connecting artists across continents.",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`group relative h-64 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-6 transition-all duration-500 ease-out hover:scale-[1.02] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                <div className="absolute -inset-8 bg-red-500/10 blur-2xl" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <h3 className="text-lg text-white">{project.title}</h3>

                <p className="text-sm text-zinc-400 opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
