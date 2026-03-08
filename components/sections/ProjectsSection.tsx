const projects = [
  {
    title: "Madfest",
    description: "A landmark festival bringing together underground artists and global hip-hop culture.",
  },
  {
    title: "Paris Showcase",
    description: "A live showcase connecting Tunisian talent with the Paris hip-hop scene.",
  },
  {
    title: "Street Sessions",
    description: "Raw live performances filmed in urban spaces across Tunisia.",
  },
  {
    title: "Mob Visual Series",
    description: "A collection of cinematic music visuals directed by the collective.",
  },
  {
    title: "Mob Cypher",
    description: "A series of freestyle cyphers highlighting emerging voices.",
  },
  {
    title: "Global Collaborations",
    description: "Cross-border collaborations connecting artists across continents.",
  },
];

export default function ProjectsSection() {
  return (
    <section className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.35em] text-[#ff2a2a] uppercase">Projects</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">The Mob’s Journey</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group relative h-52 overflow-hidden border border-white/10 bg-zinc-900">
              <div className="absolute inset-0 scale-100 transform bg-[linear-gradient(145deg,#191919,#050505)] transition-all duration-500 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ff2a2a,transparent_45%)] transition-all duration-500 ease-out group-hover:opacity-60" />
              <div className="absolute inset-0 flex items-end p-4">
                <div className="translate-y-2 transition-all duration-500 ease-out group-hover:translate-y-0">
                  <h3 className="text-lg text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    {project.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
