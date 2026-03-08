const socials = ["Instagram", "YouTube", "Spotify", "TikTok"];

export default function ContactSection() {
  return (
    <section className="border-t border-white/10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#ff2a2a]">Contact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Let’s Build Something Bold
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          For bookings, collaborations, and creative direction inquiries, reach out and we’ll respond with
          availability and next steps.
        </p>

        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center border border-[#ff2a2a] px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition-all duration-300 ease-out hover:bg-[#ff2a2a]"
        >
          Contact@Collective.com
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-zinc-400">
          {socials.map((social) => (
            <a key={social} href="#" className="transition-all duration-300 ease-out hover:text-[#ff2a2a]">
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
