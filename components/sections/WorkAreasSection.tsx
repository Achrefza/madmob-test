const areas = [
  {
    title: "DJing",
    image: "/images/backgrounds/djing.webp",
    description:
      "Curated sets and sonic direction that transform venues, films, and digital spaces into immersive atmospheres.",
  },
  {
    title: "Music Videos & Visuals",
    image: "/images/backgrounds/madmob.png",
    description:
      "Cinematic editing and visual rhythm built for music videos, campaign films, and cultural storytelling.",
  },
  {
    title: "Event organanization",
    image: "/images/backgrounds/event.webp",
    description:
      "We design and deliver explosive music festivals,residencies, and unforgettable live performances, crafting immersive experiences that unite artists and audiences.",
  },
  {
    title: "Art Direction & Creative Direction",
    image: "/images/backgrounds/madmob.png",
    description:
      "Our creative team shapes the visual narrative of our collective, from branding to event aesthetics.",
  },
  {
    title: "Music Production",
    image: "/images/backgrounds/madmob.png",
    description:
      "We craft original tracks, blending diverse influences from hip-hop, electronic, and alternative music.",
  },
];

export default function WorkAreasSection() {
  return (
    <section id="work-areas" className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="font-madmob text-xs tracking-[0.35em] text-[var(--accent-red)] uppercase">Areas of Work</p>
          <h2 className="font-madmob mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">D i s c i p l i n e s</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((area) => (
            <article
              key={area.title}
              className="group border border-white/15 bg-zinc-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-red)]/70 hover:bg-zinc-900"
            >
              <div
                className={`mb-5 h-44 w-full relative overflow-hidden bg-cover bg-center ${
                  area.image ? "" : "bg-gradient-to-br from-zinc-800 to-zinc-950"
                }`}
                style={area.image ? { backgroundImage: `url(${area.image})` } : undefined}
              >
                <div className="absolute inset-0 opacity-70 bg-[linear-gradient(135deg,rgba(205,28,24,0.35),rgba(0,0,0,0)_45%)]" />
                {!area.image && (
                  <div className="absolute inset-0 flex items-end p-4 text-[11px] tracking-[0.25em] text-zinc-300 uppercase">
                    Placeholder Image
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-medium text-white">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
