import { useState } from "react"
import Reveal from "./Reveal"

const initial = { name: "", email: "", drink: "Sunrise Orange", message: "" }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
    setForm(initial)
  }

  return (
    <section id="contact" className="w-full bg-bg-soft px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="h-full rounded-[2rem] bg-foam p-7 text-[#f7f1e8] sm:p-10">
            <p className="text-sm font-semibold tracking-[0.2em] text-mango uppercase">Contact</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Come to the counter, or write to us.</h2>
            <ul className="mt-8 space-y-5 text-sm text-white/80">
              <li>
                <span className="block text-xs tracking-[0.16em] text-white/50 uppercase">Visit</span>
                Juice Mall, Level 1, Orchard Wing
                <br />
                18 Orchard Lane, Bengaluru 560001
              </li>
              <li>
                <span className="block text-xs tracking-[0.16em] text-white/50 uppercase">Hours</span>
                Every day, 8:00 am – 9:30 pm
              </li>
              <li>
                <span className="block text-xs tracking-[0.16em] text-white/50 uppercase">Call</span>
                <a href="tel:+919876543210" className="hover:text-mango">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="block text-xs tracking-[0.16em] text-white/50 uppercase">Email</span>
                <a href="mailto:hello@juicemall.example" className="hover:text-mango">
                  hello@juicemall.example
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form onSubmit={submit} className="rounded-[2rem] border border-line bg-card p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" value={form.name} onChange={update} required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={update} required />
            </div>
            <label className="mt-4 block text-sm font-medium">
              Favorite pour
              <select
                name="drink"
                value={form.drink}
                onChange={update}
                className="mt-1.5 w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-citrus"
              >
                <option>Sunrise Orange</option>
                <option>Emerald Detox</option>
                <option>Berry Burst</option>
                <option>Mango Glow</option>
                <option>A combo</option>
              </select>
            </label>
            <label className="mt-4 block text-sm font-medium">
              Message
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={update}
                placeholder="Ask about a party tray, a weekly cleanse, or today’s fruit."
                className="mt-1.5 w-full resize-none rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-citrus"
              />
            </label>
            <button
              type="submit"
              className="mt-5 rounded-full bg-citrus px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#ff6238]"
            >
              Send message
            </button>
            {sent && (
              <p className="mt-4 rounded-2xl bg-leaf/10 px-4 py-3 text-sm text-leaf" role="status">
                Message received. We’ll reply from the counter before the evening rush.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        {...props}
        className="mt-1.5 w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-citrus"
      />
    </label>
  )
}
