const projects = [
  "Night Pulse Session",
  "Red Frame Visual",
  "Street Anthem Vol.1",
  "Noir City Live Set",
  "Afterlight Edit",
  "Collective Teaser",
];

export default function ProjectsSection() {
  return (
    <section className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.35em] text-[#ff2a2a] uppercase">Projects</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Selected Work</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project} className="group relative h-52 overflow-hidden border border-white/10 bg-zinc-900">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#191919,#050505)]" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ff2a2a,transparent_45%)] transition-opacity duration-300 group-hover:opacity-50" />
              <div className="absolute inset-0 flex items-end p-4">
                <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-xs tracking-[0.25em] text-zinc-400 uppercase">Project</p>
                  <h3 className="mt-2 text-lg text-white">{project}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
