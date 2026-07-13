"use client";

import { useEffect, useState } from "react";
import OpenChip from "./OpenChip";

/* The hero is the shopfront: a full drench of the real paint green, framed
   like the panelled fascia, with the window's own lettering. The globe pendant
   lamps from inside hang into the field — click one and the lights come on. */

function PendantLamp({
  drop,
  delay,
  lit,
  onToggle,
}: {
  drop: number; // cord length in px
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
      className="group origin-top cursor-pointer motion-safe:animate-[lamp-sway_7s_ease-in-out_infinite] focus-visible:outline-brass"
      style={{ animationDelay: delay }}
    >
      <span className="block h-[var(--drop)] w-px bg-glass/45 mx-auto" style={{ ["--drop" as string]: `${drop}px` }} />
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
      className={`relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 transition-colors duration-1000 ${
        lit ? "bg-shopfront-deep" : "bg-shopfront"
      }`}
    >
      {/* panelled-fascia frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 border border-glass/25 sm:inset-6"
      />

      {/* pendant lamps, hanging in from the ceiling like through the window */}
      <div className="absolute top-0 left-[14%] hidden sm:block">
        <PendantLamp drop={110} delay="0s" lit={lit} onToggle={toggle} />
      </div>
      <div className="absolute top-0 right-[16%] hidden sm:block">
        <PendantLamp drop={164} delay="-3.2s" lit={lit} onToggle={toggle} />
      </div>
      {/* single lamp on mobile */}
      <div className="absolute top-0 right-[12%] sm:hidden">
        <PendantLamp drop={84} delay="0s" lit={lit} onToggle={toggle} />
      </div>

      {/* the window lettering */}
      <h1 className="decal pl-[0.3em] text-center text-[clamp(2.6rem,10vw,5.75rem)] leading-none tracking-[0.3em] text-glass">
        Porcelain
        <span className="sr-only"> Coffee Bar — speciality coffee on Old Elvet, Durham</span>
      </h1>
      <div aria-hidden className="mt-5 h-px w-24 bg-glass/50" />
      <p
        aria-hidden
        className="decal mt-5 pl-[0.62em] text-center text-[clamp(0.9rem,2.4vw,1.2rem)] tracking-[0.62em] text-glass/90"
      >
        Coffee
      </p>

      <p className="mt-10 max-w-md text-center font-serif text-lg leading-relaxed text-glass/95">
        A dad-and-daughter coffee bar on Old Elvet.
      </p>

      <div className="mt-8 flex flex-col items-center gap-2.5 sm:flex-row sm:gap-6">
        <span className="font-mono text-[0.8125rem] tracking-tight text-glass/80">
          3C OLD ELVET, DURHAM
        </span>
        <span aria-hidden className="hidden size-1 rounded-full bg-glass/50 sm:block" />
        <OpenChip onGreen />
      </div>

      {/* quiet scroll cue */}
      <a
        href="#welcome"
        aria-label="Scroll to the good bit"
        className="absolute bottom-8 text-glass/60 transition-colors hover:text-glass"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M3 6.5 L9 12.5 L15 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </header>
  );
}
