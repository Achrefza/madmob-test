"use client";

import { useEffect, useMemo, useState } from "react";

type UseActiveSectionOptions = {
  sectionIds: string[];
  threshold?: number;
};

export function useActiveSection({ sectionIds, threshold = 0.5 }: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");

  const normalizedIds = useMemo(() => sectionIds.filter(Boolean), [sectionIds]);

  useEffect(() => {
    if (typeof window === "undefined" || normalizedIds.length === 0) {
      return;
    }

    const sections = normalizedIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const nextActiveSection = visibleEntries[0].target.id;

        setActiveSection((currentSection) =>
          currentSection === nextActiveSection ? currentSection : nextActiveSection,
        );
      },
      {
        threshold,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [normalizedIds, threshold]);

  return { activeSection, setActiveSection };
}
