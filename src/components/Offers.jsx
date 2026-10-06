import { inr, offers } from "../data/menu"
import Reveal from "./Reveal"

export default function Offers({ onAdd }) {
  return (
    <section id="offers" className="w-full bg-foam px-4 py-20 text-[#f7f1e8] sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-mango uppercase">Special offers</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl">Combos worth sharing.</h2>
          </div>
          <p className="max-w-sm text-sm text-white/70">
            Bundles change with the fruit. Today’s set is mixed at the counter and packed cold.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <Reveal key={offer.id} delay={index * 90} className="h-full">
            <article className="offer-card flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-[#183024]">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={offer.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-mango px-3 py-1 text-xs font-bold text-foam">
                  {offer.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-3xl">{offer.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{offer.detail}</p>
                <div className="mt-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm text-white/45 line-through">{inr(offer.was)}</p>
                    <p className="font-display text-3xl text-mango">{inr(offer.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onAdd({
                        id: offer.id,
                        name: offer.name,
                        price: offer.price,
                        image: offer.image,
                      })
                    }
                    className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-foam transition hover:-translate-y-0.5"
                  >
                    Add combo
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
