"use client";

import { useCallback, useState } from "react";

const navigationItems = [
  {
    title: "Work Areas",
    href: "#work-areas",
    sectionId: "work-areas",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M14 4v11.5a3.5 3.5 0 1 1-1-2.45V6.3l7-1.8v9a3.5 3.5 0 1 1-1-2.45V3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Projects",
    href: "#projects",
    sectionId: "projects",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 3.8l2.2 4.4 4.9.7-3.5 3.4.8 4.9L12 15l-4.4 2.2.8-4.9-3.5-3.4 4.9-.7z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Contact",
    href: "#contact",
    sectionId: "contact",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm8 6.2L5.2 8h13.6z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function CollectiveSection() {
  const [activeNavigation, setActiveNavigation] = useState<string | null>(null);

  const applySectionHighlight = useCallback((target: HTMLElement) => {
    const cinematicHighlightClass =
      "bg-[radial-gradient(circle_at_center,rgba(205,28,24,0.08),transparent_70%)] shadow-[inset_0_0_48px_rgba(205,28,24,0.14)]";

    target.classList.add("transition-[background,box-shadow]", "duration-1000", "ease-out");
    target.classList.add(...cinematicHighlightClass.split(" "));

    window.setTimeout(() => {
      target.classList.remove(...cinematicHighlightClass.split(" "));
    }, 1000);
  }, []);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId);

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      applySectionHighlight(target);
    },
    [applySectionHighlight],
  );

  const handleNavigationClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      event.preventDefault();

      setActiveNavigation(sectionId);

      window.setTimeout(() => {
        handleNavigate(sectionId);
        setActiveNavigation((currentActive) => (currentActive === sectionId ? null : currentActive));
      }, 150);
    },
    [handleNavigate],
  );

  return (
    <section className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none"
        style={{ backgroundImage: 'url("/images/backgrounds/collective.webp")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs tracking-[0.35em] text-[var(--accent-red)] uppercase">MADMOB</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Amplifying Voices, Shaping Culture
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          more than a collective—it’s a platform for artistic expression and cultural impact. We champion diversity,
          authenticity, and connection, bridging underground talent with global audiences through live shows,
          immersive experiences, and community-driven projects.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {navigationItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(event) => handleNavigationClick(event, item.sectionId)}
              className={`group flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-zinc-950/60 px-5 py-4 text-left shadow-[0_0_0_rgba(205,28,24,0)] transition-all duration-400 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-[var(--accent-red)]/70 hover:shadow-[0_0_20px_rgba(205,28,24,0.15)] active:scale-95 active:duration-150 ${
                activeNavigation === item.sectionId ? "scale-95 duration-150" : ""
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--accent-red)]/30 bg-black text-[var(--accent-red)] transition-colors duration-300 group-hover:border-[var(--accent-red)]/60">
                {item.icon}
              </span>
              <span className="text-sm tracking-[0.08em] text-zinc-100 uppercase">{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
