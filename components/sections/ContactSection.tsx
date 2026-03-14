const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/MADMOB4L", icon: "/images/backgrounds/facebook.png" },
  { name: "Instagram", href: "https://www.instagram.com/_madmob", icon: "/images/backgrounds/instagram.png" },
  { name: "SoundCloud", href: "https://soundcloud.com/madmob-44422605", icon: "/images/backgrounds/soundcloud.png" },
  { name: "YouTube", href: "https://www.youtube.com/@madmob4l", icon: "/images/backgrounds/youtube.png" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/10 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-madmob text-xs tracking-[0.35em] text-[var(--accent-red)] uppercase">Contact</p>
        <h2 className="font-madmob mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"> M a d m o b</h2>
        <p className="mx-auto mt-5 max-w-2xl text-zinc-300">
          For bookings, collaborations, and creative direction inquiries, reach out and we’ll respond with availability and next steps.
        </p>

        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center border border-[var(--accent-red)] px-8 py-3 text-sm tracking-[0.2em] text-white uppercase transition hover:bg-[var(--accent-red)]"
        >
          contact@madmob.tn
        </a>

        <div className="flex justify-center items-center gap-10 mt-10">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="group relative"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="w-10 h-10 transition-all duration-300 ease-out opacity-80 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-3 drop-shadow-[0_0_0px_rgba(0,0,0,0)] group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.9)] group-hover:drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]"
              />
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle,rgba(255,0,0,0.35)_0%,rgba(255,0,0,0)_70%)] blur-md"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
