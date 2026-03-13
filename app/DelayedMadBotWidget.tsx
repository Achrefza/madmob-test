"use client";

import { useEffect, useState } from "react";
import MadBotWidget from "@/components/MadBotWidget";

export default function DelayedMadBotWidget() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showMadBot, setShowMadBot] = useState(false);

  useEffect(() => {
    const handleIntroFinished = () => {
      setIntroComplete(true);
    };

    window.addEventListener("madmob:intro-finished", handleIntroFinished);

    return () => {
      window.removeEventListener("madmob:intro-finished", handleIntroFinished);
    };
  }, []);

  useEffect(() => {
    if (!introComplete) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowMadBot(true);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [introComplete]);

  if (!showMadBot) {
    return null;
  }

  return <MadBotWidget />;
}
