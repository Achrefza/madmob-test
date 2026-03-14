"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/hooks/useScrollLock";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLoader, setShowLoader] = useState(true);
  const [isInactive, setIsInactive] = useState(false);
  const hasFinishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) {
      return;
    }

    hasFinishedRef.current = true;
    setIsInactive(true);
    unlockScroll();
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    lockScroll();

    const video = videoRef.current;

    if (video) {
      video.muted = true;
      video.playsInline = true;

      // attempt autoplay (works on most devices)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          finishIntro();
        });
      }
    }

    // loader stays at least 1 second
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    // safety net in case the browser never fires onEnded
    const fallbackTimer = setTimeout(() => {
      finishIntro();
    }, 7000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(fallbackTimer);
      unlockScroll();
    };
  }, [finishIntro]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black overflow-hidden ${isInactive ? "pointer-events-none" : ""}`}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        className="w-[50vw] max-w-[650px] h-auto object-contain"
        src="/intro/intro.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={finishIntro}
        onError={finishIntro}
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
