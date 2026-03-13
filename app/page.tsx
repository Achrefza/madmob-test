"use client";

import { useEffect, useState } from "react";
import Intro from "@/components/intro/Intro";
import HeroSection from "@/components/sections/HeroSection";
import CollectiveSection from "@/components/sections/CollectiveSection";
import WorkAreasSection from "@/components/sections/WorkAreasSection";
import CollaborationsSection from "@/components/sections/CollaborationsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import BleedSection from "@/components/sections/BleedSection";
import MusicCoversSection from "@/components/sections/MusicCoversSection";
import VideoClipsSection from "@/components/sections/VideoClipsSection";

export default function Page() {
  const [introFinished, setIntroFinished] = useState(false);

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

  useEffect(() => {
    if (!introFinished) {
      return;
    }

    window.dispatchEvent(new Event("madmob:intro-finished"));
  }, [introFinished]);

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      {!introFinished ? (
        <Intro onFinish={() => setIntroFinished(true)} />
      ) : (
        <>
          <HeroSection />
          <CollectiveSection />
          <WorkAreasSection />
          <ProjectsSection />
          <MusicCoversSection />
          <VideoClipsSection />
          <CollaborationsSection />
          <BleedSection />
          <ContactSection />
        </>
      )}
    </main>
  );
}
