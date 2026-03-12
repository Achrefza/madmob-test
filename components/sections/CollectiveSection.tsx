"use client";

import { useCallback, useMemo, useState } from "react";

import { useActiveSection } from "@/hooks/useActiveSection";

const navigationItems = [
  {
    title: "Work Areas",
    label: "W O R K   A R E A S",
    href: "#work-areas",
    sectionId: "work-areas",
  },
  {
    title: "Projects",
    label: "P R O J E C T S",
    href: "#projects",
    sectionId: "projects",
  },
  {
    title: "Collaborations",
    label: "C O L L A B O R A T I O N S",
    href: "#collaborations",
    sectionId: "collaborations",
  },
  {
    title: "Bleed",
    label: "B L E E D",
    href: "#bleed",
    sectionId: "bleed",
  },
  {
    title: "Contact",
    label: "C O N T A C T",
    href: "#contact",
    sectionId: "contact",
  },
];

export default function CollectiveSection() {
  const [activeNavigation, setActiveNavigation] = useState<string | null>(null);
  const sectionIds = useMemo(() => navigationItems.map((item) => item.sectionId), []);
  const { activeSection, setActiveSection } = useActiveSection({
    sectionIds,
    threshold: 0.5,
  });

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
      setActiveSection(sectionId);

      window.setTimeout(() => {
        handleNavigate(sectionId);
        setActiveNavigation((currentActive) => (currentActive === sectionId ? null : currentActive));
      }, 150);
    },
    [handleNavigate, setActiveSection],
  );

  return (
    <section className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:py-28">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />

      <div className="relative z-20 mx-auto max-w-4xl text-center">
        <p className="font-madmob mb-4 text-xs tracking-[0.35em] text-[var(--accent-red)] uppercase">MADMOB</p>
        <h2 className="font-madmob text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          C u l t u r e
        </h2>
        <p className="font-madmob mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          more than a collective—it’s a platform for artistic expression and cultural impact. We champion diversity,
          authenticity, and connection, bridging underground talent with global audiences through live shows,
          immersive experiences, and community-driven projects.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.sectionId;

            return (
              <a
                key={item.title}
                href={item.href}
                onClick={(event) => handleNavigationClick(event, item.sectionId)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-zinc-950/60 px-5 py-4 text-left shadow-[0_0_0_rgba(205,28,24,0)] transition-all duration-400 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-[var(--accent-red)]/70 hover:shadow-[0_0_20px_rgba(205,28,24,0.15)] active:scale-95 active:duration-150 ${
                  activeNavigation === item.sectionId ? "scale-95 duration-150" : ""
                } ${
                  isActive
                    ? "border-[var(--accent-red)]/80 bg-[radial-gradient(circle_at_center,rgba(205,28,24,0.12),rgba(24,24,27,0.75))] shadow-[0_0_24px_rgba(205,28,24,0.22)]"
                    : ""
                }`}
              >
                <span
                  className={`font-madmob text-sm tracking-[0.08em] uppercase ${isActive ? "text-[var(--accent-red)]" : "text-zinc-100"}`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
