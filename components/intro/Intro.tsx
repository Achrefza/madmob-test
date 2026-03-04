"use client";

import { useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/hooks/useScrollLock";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    lockScroll();

    const video = videoRef.current;

    if (video) {
      video.muted = true;
      video.playsInline = true;

      // attempt autoplay (works on most devices)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    // loader stays at least 1 second
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(loaderTimer);
  }, []);

  const handleEnd = () => {
    unlockScroll();
    onFinish();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black overflow-hidden">

      {/* VIDEO */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/intro/intro.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={handleEnd}
      />

      {/* LOADING TEXT */}
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