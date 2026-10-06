import { reviews } from "../data/menu"
import Reveal from "./Reveal"

export default function Testimonials() {
  return (
    <section className="w-full bg-bg px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <p className="text-sm font-semibold tracking-[0.2em] text-citrus uppercase">Guest notes</p>
        <h2 className="mt-2 max-w-2xl font-display text-4xl sm:text-5xl lg:text-6xl">
          People keep coming back for the same glass.
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <Reveal key={review.name} delay={index * 80}>
            <figure className="flex h-full flex-col rounded-[1.8rem] border border-line bg-card p-6 transition duration-300 hover:-translate-y-2 hover:border-citrus">
              <div className="flex gap-1 text-mango" aria-label={`${review.stars} stars`}>
                {Array.from({ length: review.stars }).map((_, star) => (
                  <span key={star} className="text-lg">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{review.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-citrus font-semibold text-white">
                  {review.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <span className="block font-semibold">{review.name}</span>
                  <span className="text-sm text-muted">{review.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
