import Reveal from "./Reveal"

const points = [
  { title: "Fruit, then the glass", text: "We press whole fruit. No concentrates, no syrups, no mystery blends." },
  { title: "Cold from the start", text: "Juices stay chilled from the press to the counter so the color stays loud." },
  { title: "A real mall counter", text: "Walk up, watch the pour, and leave with a drink that still tastes like the orchard." },
]

export default function About() {
  return (
    <section id="about" className="w-full bg-bg-soft px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=80"
              alt="Fresh citrus, berries, and tropical fruit"
              className="h-[28rem] w-full rounded-[2rem] object-cover sm:h-[34rem]"
            />
            <div className="float-c absolute right-4 bottom-4 left-4 rounded-3xl bg-card/95 p-5 shadow-xl backdrop-blur sm:right-auto sm:w-64">
              <p className="font-display text-4xl text-citrus">12</p>
              <p className="text-sm text-muted">years pouring at the same bright counter</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-sm font-semibold tracking-[0.2em] text-citrus uppercase">About us</p>
          <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            A juice counter that still smells like cut fruit.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Juice Mall started as a single press beside a fruit stall. The mall grew around us, and the recipe
            stayed the same: buy ripe fruit in the morning, press it in small batches, and hand it over cold.
          </p>
          <div className="mt-8 grid gap-4">
            {points.map((point) => (
              <div key={point.title} className="rounded-3xl border border-line bg-card p-5 transition hover:-translate-y-1">
                <h3 className="font-display text-2xl">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
