"use client";

import { useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/hooks/useScrollLock";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
const [minTimePassed, setMinTimePassed] = useState(false);

const ready = videoReady && minTimePassed;


  useEffect(() => {
    lockScroll();
  }, []);

  useEffect(() => {
  lockScroll();

  const timer = setTimeout(() => {
    setMinTimePassed(true);
  }, 1000); // minimum loading time

  return () => clearTimeout(timer);
}, []);


  const handleEnd = () => {
    unlockScroll();
    onFinish();
  };

  return (
  <div className="fixed inset-0 z-[999] bg-black overflow-hidden">

    {/* LOADING TEXT */}
    {!ready && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white tracking-[0.6em] text-sm animate-pulse">
          LOADING
        </div>
      </div>
    )}

    {/* VIDEO */}
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      src="/intro/intro.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={() => setVideoReady(true)}
      onEnded={handleEnd}
    />
  </div>
);

}
