const videoClips = [
  {
    src: "https://www.youtube.com/embed/NC7Gx6R0Reo",
    title: "A.L.A - Ya Ghali (Official Music Video)"
  },
  {
    src: "https://www.youtube.com/embed/Rug85eDybfs",
    title: "XIIVI - LESSGO (Official Music Video)",
  },
  {
    src: "https://www.youtube.com/embed/fRqk3TDk_c0",
    title: "KTYB X Madmob - ANANAYA (Official Music Video)",
  },
];

export default function VideoClipsSection() {
  return (
    <section id="video-clips" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.88))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="font-madmob mt-4 text-3xl font-semibold tracking-tight text-blue sm:text-4xl md:text-5xl">
          V i d e o    C l i p s
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {videoClips.map((video) => (
            <article
              key={video.src}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-900/95 via-black to-zinc-900/70 transition-all duration-500 hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={video.src}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 transition-all duration-500 group-hover:opacity-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/45 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <span className="ml-1 text-xl text-white/90">▶</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
