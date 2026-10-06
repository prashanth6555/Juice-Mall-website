import { useMemo, useState } from "react"
import { categories, inr, products } from "../data/menu"
import Reveal from "./Reveal"

export default function Menu({ onAdd }) {
  const [category, setCategory] = useState("All")
  const [bumped, setBumped] = useState(null)

  const list = useMemo(
    () => (category === "All" ? products : products.filter((item) => item.category === category)),
    [category],
  )

  const add = (product) => {
    onAdd(product)
    setBumped(product.id)
    window.setTimeout(() => setBumped((current) => (current === product.id ? null : current)), 400)
  }

  return (
    <section id="menu" className="w-full bg-bg px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-citrus uppercase">The menu</p>
            <h2 className="mt-2 max-w-xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              A whole aisle of fresh pours.
            </h2>
          </div>
          <p className="max-w-md text-muted">
            Every glass is made from whole fruit. Pick a category, hover a card, and add it to your counter order.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === item
                ? "bg-ink text-bg"
                : "border border-line bg-card text-ink hover:-translate-y-0.5 hover:border-citrus"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div key={category} className="menu-panel mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((product, index) => (
          <Reveal key={product.id} delay={Math.min(index, 6) * 60}>
            <article className="juice-card group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-line bg-card">
              <div className="relative h-56 overflow-hidden">
                <img src={product.image} alt={product.name} className="shot h-full w-full object-cover" />
                <span className="absolute top-3 left-3 rounded-full bg-bg/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                  {product.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-leaf uppercase">{product.category}</p>
                <h3 className="mt-1 font-display text-2xl">{product.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.desc}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="font-display text-2xl">{inr(product.price)}</p>
                  <button
                    type="button"
                    onClick={() => add(product)}
                    className={`rounded-full bg-citrus px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ff6238] ${
                      bumped === product.id ? "scale-110" : ""
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
