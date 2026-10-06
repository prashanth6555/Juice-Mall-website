import { useEffect, useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { IconBag, IconClose, IconMenu, IconMoon, IconSun } from "./Icons"

const links = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#offers", label: "Offers" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar({ count, onOpenCart }) {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("#home")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const sections = links.map((link) => document.querySelector(link.href)).filter(Boolean)
      const marker = window.scrollY + 140
      let current = "#home"
      sections.forEach((section) => {
        if (section.offsetTop <= marker) current = `#${section.id}`
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const go = () => setOpen(false)
  const overHero = !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        overHero ? "bg-transparent" : "bg-bg/90 shadow-[0_8px_30px_rgba(16,33,23,0.06)] backdrop-blur-xl"
      }`}
    >
      <div className="flex h-[4.5rem] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5" onClick={go}>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-citrus text-lg text-white shadow-lg shadow-citrus/30">
            <Leaf />
          </span>
          <span className={`font-display text-xl leading-none tracking-tight sm:text-2xl ${overHero ? "text-white" : "text-ink"}`}>
            Juice Mall
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link text-sm font-medium tracking-wide ${
                overHero ? "text-white/85 hover:text-white" : "text-ink/80 hover:text-ink"
              } ${active === link.href ? "active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={`grid h-11 w-11 place-items-center rounded-full border transition hover:scale-105 ${
              overHero ? "border-white/25 bg-white/10 text-white" : "border-line bg-card text-ink hover:border-citrus"
            }`}
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Open cart"
            className={`relative grid h-11 w-11 place-items-center rounded-full transition hover:scale-105 ${
              overHero ? "bg-white text-foam" : "bg-ink text-bg"
            }`}
          >
            <IconBag />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-citrus px-1 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${
              overHero ? "border-white/25 bg-white/10 text-white" : "border-line bg-card text-ink"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="menu-panel border-t border-line bg-bg px-4 pt-4 pb-8 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={go}
                className="rounded-2xl px-3 py-3 font-display text-3xl text-ink transition hover:bg-card"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function Leaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M19 4c-7 1-12 6-13 13 6-.2 11-4 13-13z" />
      <path d="M7 16c2-2 5-4 9-5" fill="none" stroke="#fff4e8" strokeWidth="1.4" />
    </svg>
  )
}
