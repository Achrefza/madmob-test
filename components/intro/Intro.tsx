"use client";

import { useEffect, useState } from "react";
import { lockScroll, unlockScroll } from "@/hooks/useScrollLock";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    lockScroll();
  }, []);

  useEffect(() => {
    if (!imageLoaded) return;

    // Show loader minimum 1 second
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    // Total intro duration
    const endTimer = setTimeout(() => {
      unlockScroll();
      onFinish();
    }, 5000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(endTimer);
    };
  }, [imageLoaded]);

  return (
    <div className="fixed inset-0 z-[999] bg-black overflow-hidden">

      <img
        src="/intro/intro.webp"
        alt="Intro animation"
        className="absolute inset-0 w-full h-full object-cover"
        onLoad={() => setImageLoaded(true)}
      />

      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white tracking-[0.6em] text-sm animate-pulse">
            LOADING
          </div>
        </div>
      )}
    </div>
  );
}