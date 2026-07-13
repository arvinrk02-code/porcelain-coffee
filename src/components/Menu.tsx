"use client";

import { useCallback, useRef } from "react";

/* The menu, from the photos and reviews — nothing invented. Set like a printed
   menu card: hairline frame, dotted leaders, the same ink line-art as the
   shopfront drawing. Easter egg: resting on an item sets a faint coffee-ring
   down at the cursor, like cups on a table while you decide. The rings are
   plain DOM + Web Animations (decorative, aria-hidden) — no React state. */

const COFFEE = [
  "Flat white",
  "Espresso",
  "Cappuccino",
  "Iced latte",
  "Hot chocolate — cocoa-dusted",
  "Matcha — hand-whisked",
  "Chai latte",
];

const CAKES = [
  "Pecan & banana loaf",
  "Carrot cake — cream-cheese frosting",
  "Vegan chocolate-chip cookies",
  "Whatever came out of the oven this morning",
];

const SVG_NS = "http://www.w3.org/2000/svg";
const RING_STROKE = "oklch(0.42 0.07 50 / 0.5)";

/* hand-drawn column marks, same stroke language as the shopfront */
function CupIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="size-9 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M10 22 C10 34 15 40 24 40 C33 40 37 34 37 22 Z" />
      <path d="M37 25 C43 24 44 32 37 33" />
      <ellipse cx="23.5" cy="22" rx="13.5" ry="3" strokeWidth="1.5" />
      <path d="M20 14 C17 11 22 9 20 6" strokeWidth="1.5" />
      <path d="M27 15 C24 12 29 10 27 7" strokeWidth="1.5" />
    </svg>
  );
}

function CakeIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="size-9 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 36 L24 12 L40 36 Z" />
      <path d="M13 29 C16 26 19 30 22 27 C25 24 28 28 31 25 C33 23 34 25 35 28" strokeWidth="1.5" />
      <path d="M24 12 C23 9 26 8 25 5" strokeWidth="1.5" />
      <path d="M4 40 H44" strokeWidth="1.5" />
    </svg>
  );
}

function makeEllipse(rx: number, ry: number, width: string, dashes: string, offset: number) {
  const e = document.createElementNS(SVG_NS, "ellipse");
  e.setAttribute("cx", "50");
  e.setAttribute("cy", "47");
  e.setAttribute("rx", String(rx));
  e.setAttribute("ry", String(ry));
  e.setAttribute("fill", "none");
  e.setAttribute("stroke", RING_STROKE);
  e.setAttribute("stroke-width", width);
  e.setAttribute("stroke-linecap", "round");
  e.setAttribute("stroke-dasharray", dashes);
  e.setAttribute("stroke-dashoffset", String(offset));
  return e;
}

/* A full ring that's usually closed, but here and there has the odd little
   gap where the cup's rim didn't sit flush. Occasionally perfect. */
function brokenRing(r: number): { pattern: string; offset: number } {
  const circumference = 2 * Math.PI * r;
  const gaps = Math.random() < 0.22 ? 0 : 1 + Math.floor(Math.random() * 2);
  if (gaps === 0) return { pattern: "none", offset: 0 };

  const gapSizes = Array.from({ length: gaps }, () => 3.5 + Math.random() * 5);
  const arcTotal = circumference - gapSizes.reduce((a, b) => a + b, 0);
  const weights = gapSizes.map(() => 0.6 + Math.random() * 0.8);
  const weightSum = weights.reduce((a, b) => a + b, 0);

  const parts: string[] = [];
  gapSizes.forEach((gap, i) => {
    parts.push(((weights[i] / weightSum) * arcTotal).toFixed(1)); // the arc
    parts.push(gap.toFixed(1)); // the little break
  });
  return { pattern: parts.join(" "), offset: Math.random() * circumference };
}

function List({
  title,
  icon,
  items,
  onRest,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  onRest: (e: React.PointerEvent) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3.5">
        {icon}
        <h3 className="font-serif text-[1.45rem] font-semibold italic">
          {title}
        </h3>
      </div>
      <ul className="mt-7 space-y-5">
        {items.map((item) => {
          const [name, note] = item.split(" — ");
          return (
            <li key={item}>
              <span
                onPointerEnter={onRest}
                className="group flex w-full items-baseline cursor-default"
              >
                <span className="font-serif text-[1.0625rem] leading-snug transition-colors group-hover:text-shopfront-deep">
                  {name}
                </span>
                {note && (
                  <>
                    <span
                      aria-hidden
                      className="mx-3 flex-1 border-b border-dotted border-ink/30 translate-y-[-0.28em]"
                    />
                    <span className="shrink-0 font-mono text-[0.75rem] text-ink-soft">
                      {note}
                    </span>
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Menu() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ringHostRef = useRef<HTMLDivElement | null>(null);
  const lastSet = useRef(0);

  const setDownCup = useCallback((e: React.PointerEvent) => {
    const section = sectionRef.current;
    const host = ringHostRef.current;
    if (!section || !host) return;
    const now = Date.now();
    if (now - lastSet.current < 700) return; // one cup at a time
    lastSet.current = now;

    // the cup lands where the cursor is, give or take a wobble
    const hostBox = host.getBoundingClientRect();
    const size = 46 + Math.random() * 18;
    const rot = Math.random() * 360;
    const x = e.clientX - hostBox.left + (Math.random() - 0.5) * 14;
    const y = e.clientY - hostBox.top + (Math.random() - 0.5) * 10;

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 94");
    svg.style.cssText = `position:absolute;left:${x - size / 2}px;top:${y - (size * 0.94) / 2}px;width:${size}px;height:${size * 0.94}px;filter:blur(0.5px);transform:rotate(${rot}deg);opacity:0.6;`;
    // one ring, set down where the cursor rests — mostly closed, odd gap
    const { pattern, offset } = brokenRing(44);
    svg.appendChild(makeEllipse(44, 44, "4", pattern, offset));
    host.appendChild(svg);

    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!noMotion) {
      svg.animate(
        [
          { opacity: 0, transform: `rotate(${rot}deg) scale(1.12)` },
          { opacity: 0.85, offset: 0.6 },
          { opacity: 0.6, transform: `rotate(${rot}deg) scale(1)` },
        ],
        { duration: 450, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "forwards" }
      );
      svg.animate([{ opacity: 0.6 }, { opacity: 0 }], {
        delay: 7800,
        duration: 1400,
        fill: "forwards",
      });
    }
    setTimeout(() => svg.remove(), noMotion ? 7000 : 9300);
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-5xl scroll-mt-8 px-6 py-24 sm:py-32"
      aria-label="Menu"
    >
      {/* coffee rings land here — decoration only */}
      <div
        ref={ringHostRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      />

      {/* the menu card */}
      <div className="border border-hairline bg-cream/60 px-7 py-14 sm:px-14 sm:py-20">
        <div className="flex items-center justify-center gap-5">
          <span aria-hidden className="h-px w-10 bg-brass/60 sm:w-16" />
          <h2 className="decal pl-[0.3em] text-center text-[1.05rem] tracking-[0.3em] text-ink">
            The menu
          </h2>
          <span aria-hidden className="h-px w-10 bg-brass/60 sm:w-16" />
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-16 sm:grid-cols-2 sm:gap-14">
          <List title="Coffee" icon={<CupIcon />} items={COFFEE} onRest={setDownCup} />
          <List title="Cakes" icon={<CakeIcon />} items={CAKES} onRest={setDownCup} />
        </div>

        <p className="mt-16 text-center font-mono text-[0.75rem] leading-relaxed tracking-tight text-ink-soft">
          CAKES FROM £4.25 · IT CHANGES — ASK AT THE COUNTER
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          BEANS BY FIKA, ROASTED IN THE NORTH EAST
        </p>
      </div>
    </section>
  );
}
