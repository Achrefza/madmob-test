"use client";

import { useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/hooks/useScrollLock";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    lockScroll();

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // LOADING stays 1 second minimum

    return () => clearTimeout(timer);
  }, []);

  const handleEnd = () => {
    unlockScroll();
    onFinish();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black overflow-hidden">

      {/* VIDEO ALWAYS VISIBLE (important for iOS autoplay) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/intro/Intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
      />

      {/* LOADING OVERLAY */}
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