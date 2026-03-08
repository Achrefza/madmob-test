"use client";

import { useCallback } from "react";

const navigationItems = [
  {
    title: "Work Areas",
    href: "#work-areas",
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
  const applySectionHighlight = useCallback((target: HTMLElement) => {
    const cinematicHighlightClass =
      "bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.08),transparent_70%)] shadow-[inset_0_0_48px_rgba(255,42,42,0.14)]";

    target.classList.add("transition-[background,box-shadow]", "duration-1000", "ease-out");
    target.classList.add(...cinematicHighlightClass.split(" "));

    window.setTimeout(() => {
      target.classList.remove(...cinematicHighlightClass.split(" "));
    }, 1000);
  }, []);

  const registerNavigationFeedback = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();

      const targetId = href.replace("#", "");
      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const isReached = entries.some((entry) => entry.isIntersecting);

          if (!isReached) {
            return;
          }

          observer.disconnect();
          applySectionHighlight(target);
        },
        { threshold: 0.45 },
      );

      observer.observe(target);

      window.setTimeout(() => {
        window.location.hash = targetId;
      }, 170);

      window.setTimeout(() => {
        observer.disconnect();
      }, 2200);
    },
    [applySectionHighlight],
  );

  return (
    <section className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs tracking-[0.35em] text-[#ff2a2a] uppercase">MADMOB</p>
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
              onClick={(event) => registerNavigationFeedback(event, item.href)}
              className="group flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-zinc-950/60 px-5 py-4 text-left shadow-[0_0_0_rgba(255,42,42,0)] transition-all duration-400 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-[#ff2a2a]/70 hover:shadow-[0_0_20px_rgba(255,42,42,0.15)] active:scale-95 active:duration-200"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ff2a2a]/30 bg-black text-[#ff2a2a] transition-colors duration-300 group-hover:border-[#ff2a2a]/60">
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
