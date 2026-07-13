import ReviewCta from "./ReviewCta";

/* Real 5★ Google reviews, first-name attributed. Staggered editorial blocks —
   no card grid. The red appears only as the stars and the plate-rim rings. */

const REVIEWS = [
  {
    quote: "Porcelain serves up the best coffee in Durham city by far.",
    name: "Jonathan H.",
  },
  {
    quote:
      "Stunning decor, lush atmosphere and a top notch brew. Durham was screaming out for more speciality coffee. 10/10!",
    name: "Christopher B.",
  },
  {
    quote: "I think I’ve accidentally found my new fav coffee shop in Durham!",
    name: "Layla Jade",
  },
];

function Stars() {
  return (
    <span className="inline-flex gap-1 text-roundel" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.3l7.1-.7z" />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32" aria-label="Reviews">
      <p className="font-mono text-[0.8125rem] tracking-tight text-ink-soft">
        <Stars />
        <span className="ml-3 align-[2px]">4.9 OUT OF 5 · 81 GOOGLE REVIEWS</span>
      </p>

      <div className="mt-14 space-y-14">
        {REVIEWS.map((r, i) => (
          <figure
            key={r.name}
            className={`max-w-xl ${i === 1 ? "sm:ml-auto sm:text-right" : ""} ${
              i === 2 ? "sm:ml-24" : ""
            }`}
          >
            <blockquote className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] leading-snug font-medium text-balance">
              “{r.quote}”
            </blockquote>
            <figcaption
              className={`mt-4 flex items-center gap-3 font-mono text-[0.75rem] text-ink-soft ${
                i === 1 ? "sm:justify-end" : ""
              }`}
            >
              {/* plate-rim ring — their crockery */}
              <span
                aria-hidden
                className="inline-block size-3 rounded-full border-2 border-roundel"
              />
              {r.name.toUpperCase()} · GOOGLE
            </figcaption>
          </figure>
        ))}
      </div>

      {/* the funnel: been in? pass it on */}
      <ReviewCta />
    </section>
  );
}
