const areas = [
  {
    title: "DJing",
    description:
      "Curated sets and sonic direction that transform venues, films, and digital spaces into immersive atmospheres.",
  },
  {
    title: "Music Videos & Visuals",
    description:
      "Cinematic editing and visual rhythm built for music videos, campaign films, and cultural storytelling.",
  },
  {
    title: "Event organanization",
    description:
      "We design and deliver explosive music festivals,residencies, and unforgettable live performances, crafting immersive experiences that unite artists and audiences.",
  },
  {
    title: "Art Direction & Creative Direction",
    description:
      "Our creative team shapes the visual narrative of our collective, from branding to event aesthetics.",
  },
  {
    title: "Music Production",
    description:
      "We craft original tracks, blending diverse influences from hip-hop, electronic, and alternative music.",
  },
];

export default function WorkAreasSection() {
  return (
    <section className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-[#ff2a2a]">Areas of Work</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">Craft Disciplines</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((area) => (
            <article
              key={area.title}
              className="group rounded-lg border border-white/10 bg-zinc-950/60 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#ff2a2a]/60"
            >
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-md bg-gradient-to-br from-zinc-800 to-zinc-950">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,42,42,0.35),rgba(0,0,0,0)_45%)] opacity-70" />
                <div className="absolute inset-0 flex items-end p-4 text-[11px] uppercase tracking-[0.25em] text-zinc-300">
                  Placeholder Image
                </div>
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
