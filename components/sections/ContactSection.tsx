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

        <div className="flex justify-center items-center gap-8 mt-10">
          {socialLinks.map((social) => (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
              <img
                src={social.icon}
                alt={social.name}
                className="w-10 h-10 opacity-80 hover:opacity-100 hover:scale-110 transition duration-200"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
