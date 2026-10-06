const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
  { label: "WhatsApp", href: "https://wa.me/919876543210" },
]

export default function Footer() {
  return (
    <footer className="w-full bg-ink px-4 py-12 text-bg sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-display text-4xl">Juice Mall</p>
          <p className="mt-2 max-w-sm text-sm text-white/70">
            Cold-pressed fruit, poured at the mall counter. Come thirsty.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Juice Mall. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#menu" className="hover:text-white">
            Menu
          </a>
          <a href="#offers" className="hover:text-white">
            Offers
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
