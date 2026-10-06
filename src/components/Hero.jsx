const flavors = ["Orange", "Mango", "Kale", "Berry", "Coconut", "Pineapple", "Beet", "Mint"]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-foam text-white">
      <img
        src="https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=2000&q=80"
        alt="Rows of fresh colorful juices"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-shade absolute inset-0" />
      <div className="grain absolute inset-0 opacity-50" />
      <div className="blob absolute -top-24 -left-16 h-72 w-72 bg-citrus/40 blur-2xl" />
      <div className="blob absolute right-[-4rem] bottom-10 h-80 w-80 bg-mango/30 blur-3xl" />

      <div className="relative flex min-h-[100svh] w-full flex-col justify-end px-4 pt-28 pb-8 sm:px-6 lg:px-8 lg:pb-10">
        <div className="grid w-full items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-mango" />
              Pressed this morning
            </p>
            <h1 className="max-w-4xl font-display text-[3.1rem] leading-[0.92] font-bold tracking-tight sm:text-7xl lg:text-8xl">
              Sip the sunshine, glass by glass.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Juice Mall is a bright counter of cold-pressed juices, thick smoothies, and detox blends.
              Fruit in, nothing else. Poured while you watch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="rounded-full bg-citrus px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-citrus/30 transition hover:-translate-y-0.5 hover:bg-[#ff6238]"
              >
                Explore the menu
              </a>
              <a
                href="#offers"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                See today’s combos
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <article className="float-a rounded-3xl border border-white/15 bg-white/12 p-4 backdrop-blur-md">
              <p className="text-xs tracking-[0.16em] text-mango uppercase">Counter favorite</p>
              <p className="mt-1 font-display text-2xl">Sunrise Orange</p>
              <p className="text-sm text-white/75">Valencia oranges, pressed to order · ₹149</p>
            </article>
            <article className="float-b rounded-3xl border border-white/15 bg-foam/70 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.16em] text-leaf uppercase">Open today</p>
                  <p className="mt-1 font-display text-2xl">8:00 — 9:30</p>
                </div>
                <p className="text-right text-sm text-white/75">
                  18 Orchard Lane
                  <br />
                  Bengaluru
                </p>
              </div>
            </article>
          </div>
        </div>

        <dl className="mt-10 grid w-full grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {[
            ["40+", "Recipes on tap"],
            ["0", "Added sugar"],
            ["15 min", "Counter pickup"],
            ["4.9", "Guest rating"],
          ].map(([value, label]) => (
            <div key={label} className="bg-foam/40 px-4 py-4 backdrop-blur-md sm:px-6">
              <dt className="font-display text-2xl sm:text-3xl">{value}</dt>
              <dd className="text-sm text-white/70">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 bg-citrus py-3 text-white">
        <div className="marquee-track flex w-max gap-8 pr-8">
          {[...flavors, ...flavors].map((flavor, index) => (
            <span key={`${flavor}-${index}`} className="flex items-center gap-8 text-sm font-semibold tracking-[0.22em] uppercase">
              {flavor}
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
