"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import OpenChip from "./OpenChip";
import watercolour from "../../public/art/shopfront-watercolour.jpg";

/* The hero is now a painting of the shopfront. A deep green watercolour wash
   carries the nav and wordmark, bleeding into warm paper where the painted
   shop stands. The pendant lamps still work the lights — click one and the
   painting's windows glow like the photograph the painting came from. */

// The paper colour bled inward over every edge of the painting, so it has no
// boundary against the page — the shop's centre stays crisp, its edges (and the
// top, the worst offender) melt into the exact page paper. No straight lines.
const PAPER_FEATHER =
  "linear-gradient(to bottom, var(--color-paper) 0%, transparent 19%)," +
  "linear-gradient(to top, var(--color-paper) 0%, transparent 13%)," +
  "linear-gradient(to right, var(--color-paper) 0%, transparent 15%)," +
  "linear-gradient(to left, var(--color-paper) 0%, transparent 15%)";

// ragged pigment edge for the bottom of the green wash
const WASH_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 H100 V84 C93 89 86 83 78 87 C70 91 63 84 55 88 C46 92 38 85 30 89 C22 93 13 86 6 90 L0 87 Z' fill='black'/%3E%3C/svg%3E\")";

function PendantLamp({
  cordClass,
  delay,
  lit,
  onToggle,
}: {
  cordClass: string;
  delay: string;
  lit: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={lit}
      aria-label={lit ? "Turn the lamps off" : "Turn the lamps on"}
      className="group origin-top cursor-pointer p-2 motion-safe:animate-[lamp-sway_7s_ease-in-out_infinite] focus-visible:outline-brass"
      style={{ animationDelay: delay }}
    >
      <span className={`block w-px bg-glass/45 mx-auto ${cordClass}`} />
      <span
        className={`block size-9 rounded-full transition-all duration-700 ${
          lit
            ? "bg-[oklch(0.95_0.05_90)] shadow-[0_0_36px_14px_oklch(0.9_0.09_90_/_0.5)]"
            : "bg-glass/85 group-hover:bg-glass"
        }`}
      />
    </button>
  );
}

/* warm light behind the painting's windows — positions are % of the square
   painting (left pane, right pane, door glass + transom) */
function WindowGlow({ lit }: { lit: boolean }) {
  const glow = (style: React.CSSProperties, extra = "") => (
    <span
      aria-hidden
      className={`absolute rounded-[45%] blur-md transition-opacity duration-[1200ms] ${extra} ${
        lit ? "opacity-100" : "opacity-0"
      }`}
      style={style}
    />
  );
  const warm = (a: number) =>
    `radial-gradient(closest-side, oklch(0.88 0.11 85 / ${a}), oklch(0.8 0.13 75 / ${a * 0.55}) 60%, transparent 100%)`;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* left pane */}
      {glow({ left: "13.5%", top: "26.5%", width: "29.5%", height: "29%", background: warm(0.8) })}
      {/* right pane */}
      {glow({ left: "68%", top: "26.5%", width: "21%", height: "29%", background: warm(0.8) })}
      {/* door glass + transom */}
      {glow({ left: "44%", top: "26%", width: "13%", height: "34%", background: warm(0.65) })}
      {/* soft ambient spill onto the pavement */}
      {glow(
        { left: "18%", top: "56%", width: "64%", height: "26%", background: warm(0.22) },
        "blur-xl"
      )}
    </div>
  );
}

export default function Hero() {
  const [lit, setLit] = useState(false);
  const toggle = () => setLit((v) => !v);

  // for the nosy — found, not announced
  useEffect(() => {
    console.log(
      "%c☕ You found the quiet bit. Try clicking a lamp.\n3C Old Elvet, if you're passing.",
      "font-family: Georgia, serif; font-size: 13px;"
    );
  }, []);

  return (
    <header
      id="top"
      className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-paper px-6"
    >
      {/* ------ the green watercolour wash — sized by its own content ------ */}
      <div
        className="relative -mx-6 w-[calc(100%+3rem)] pb-24"
        style={{ maskImage: WASH_MASK, WebkitMaskImage: WASH_MASK, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
      >
        {/* day wash */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-1000 ${lit ? "opacity-0" : "opacity-100"}`}
          style={{
            background:
              "radial-gradient(120% 90% at 22% 0%, oklch(0.52 0.105 130 / 0.9), transparent 60%)," +
              "radial-gradient(110% 100% at 78% 8%, oklch(0.44 0.105 136 / 0.95), transparent 66%)," +
              "linear-gradient(176deg, oklch(0.45 0.105 133) 55%, oklch(0.5 0.1 131) 100%)",
          }}
        />
        {/* dusk wash — the lights are on */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-1000 ${lit ? "opacity-100" : "opacity-0"}`}
          style={{
            background:
              "radial-gradient(120% 90% at 22% 0%, oklch(0.42 0.095 133 / 0.9), transparent 60%)," +
              "radial-gradient(110% 100% at 78% 8%, oklch(0.34 0.09 137 / 0.95), transparent 66%)," +
              "linear-gradient(176deg, oklch(0.36 0.095 134) 55%, oklch(0.41 0.09 130) 100%)",
          }}
        />
        {/* pigment granulation */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.02' numOctaves='3' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23w)'/%3E%3C/svg%3E\")",
            backgroundSize: "300px 300px",
          }}
        />

        {/* the window lettering, on the wash */}
        <div className="relative z-[1] flex flex-col items-center pt-[clamp(6.5rem,13dvh,8rem)]">
          <h1 className="decal pl-[0.3em] text-center text-[clamp(2.4rem,9vw,4.5rem)] leading-none tracking-[0.3em] text-glass">
            Porcelain
            <span className="sr-only"> Coffee Bar, speciality coffee on Old Elvet, Durham</span>
          </h1>
          <div aria-hidden className="mt-4 h-px w-24 bg-glass/50" />
          <p
            aria-hidden
            className="decal mt-4 pl-[0.62em] text-center text-[clamp(0.85rem,2.2vw,1.1rem)] tracking-[0.62em] text-glass/90"
          >
            Coffee
          </p>
        </div>
      </div>

      {/* pendant lamps, hanging into the wash — outboard of the wordmark,
          dropping below the nav buttons on small screens */}
      <div className="absolute top-0 left-[3%] sm:left-[6%]">
        <PendantLamp cordClass="h-[76px] sm:h-[104px]" delay="0s" lit={lit} onToggle={toggle} />
      </div>
      <div className="absolute top-0 right-[3%] sm:right-[6%]">
        <PendantLamp cordClass="h-[96px] sm:h-[150px]" delay="-3.2s" lit={lit} onToggle={toggle} />
      </div>

      {/* ------ the painting, standing on the paper below the wash ------ */}
      <div className="relative -mt-6 w-[min(88vw,46dvh,30rem)]">
        <Image
          src={watercolour}
          alt="Watercolour painting of the green shopfront at 3C Old Elvet, Porcelain lettered on both windows, the door between them."
          priority
          className={`w-full transition-[filter] duration-[1200ms] ${lit ? "saturate-[1.06] sepia-[0.05]" : ""}`}
          sizes="(min-width: 640px) 480px, 88vw"
        />
        <WindowGlow lit={lit} />
        {/* the edges dissolve into the exact page paper — no boundary, even lit */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px"
          style={{ background: PAPER_FEATHER }}
        />
      </div>

      {/* ------ the line, the facts — on paper ------ */}
      <p className="relative mt-[clamp(0.5rem,2dvh,1.5rem)] max-w-md text-center font-serif text-lg leading-relaxed text-ink">
        A dad-and-daughter coffee bar on Old Elvet.
      </p>
      <div className="relative mt-4 mb-20 flex flex-col items-center gap-2.5 sm:flex-row sm:gap-6">
        <span className="font-mono text-[0.8125rem] tracking-tight text-ink-soft">
          3C OLD ELVET, DURHAM
        </span>
        <span aria-hidden className="hidden size-1 rounded-full bg-ink/30 sm:block" />
        <OpenChip />
      </div>

      {/* seamless hand-off: paper dissolves into the porcelain of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-porcelain))" }}
      />

      {/* quiet scroll cue */}
      <a
        href="#welcome"
        aria-label="Scroll to the good bit"
        className="absolute bottom-3 z-[1] p-3.5 text-ink/45 transition-colors hover:text-ink"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M3 6.5 L9 12.5 L15 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </a>
    </header>
  );
}
