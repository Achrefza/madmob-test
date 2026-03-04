"use client";

import { useEffect, useState } from "react";
import Intro from "@/components/intro/Intro";

export default function Page() {
  const [introFinished, setIntroFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detect normal first mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect refresh / back-forward cache restore
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // If page restored from cache → replay intro
      if (event.persisted) {
        setIntroFinished(false);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-black text-white min-h-screen">
      {!introFinished && (
        <Intro onFinish={() => setIntroFinished(true)} />
      )}

      <div
        className={`transition-opacity duration-1000 ${
          introFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-6xl">Homepage</h1>
        </section>
      </div>
    </main>
  );
}
