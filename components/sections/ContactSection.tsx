const socials = ["Instagram", "YouTube", "Spotify", "TikTok"];

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/10 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs tracking-[0.35em] text-[var(--accent-red)] uppercase">Contact</p>
        <h2 className="font-madmob mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">S t a y M a d</h2>
        <p className="mx-auto mt-5 max-w-2xl text-zinc-300">
          For bookings, collaborations, and creative direction inquiries, reach out and we’ll respond with availability and next steps.
        </p>

        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center border border-[var(--accent-red)] px-8 py-3 text-sm tracking-[0.2em] text-white uppercase transition hover:bg-[var(--accent-red)]"
        >
          contact@madmob.tn
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-zinc-400">
          {socials.map((social) => (
            <a key={social} href="#" className="transition hover:text-white">
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
