"use client";

import { useRef } from "react";
import Roundel from "./Roundel";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21 C12 21 5 14.6 5 9.5 A7 7 0 0 1 19 9.5 C19 14.6 12 21 12 21 Z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
      <path d="M12 3.5l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2-5.6-3.2-5.6 3.2 1.3-6.2-4.7-4.3 6.3-.7z" />
    </svg>
  );
}

/* Deep green close. The coaster sits here — give it a click and it settles
   like it was just dropped on the table. */
export default function Footer() {
  const ref = useRef<HTMLButtonElement | null>(null);

  const wobble = () => {
    const el = ref.current;
    if (!el) return;
    el.style.animation = "none";
    void el.offsetWidth; // restart
    el.style.animation = "coaster-settle 900ms var(--ease-out-quart)";
  };

  return (
    <footer className="bg-shopfront-deep px-6 py-16 text-glass">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center">
        <button
          ref={ref}
          type="button"
          onClick={wobble}
          aria-label="The Porcelain coaster. Give it a spin"
          className="cursor-pointer rounded-full"
        >
          <Roundel size={76} />
        </button>

        <p className="decal pl-[0.22em] text-[0.8125rem] tracking-[0.22em] text-glass/90">
          Porcelain Coffee · 3C Old Elvet · Durham DH1 3HL
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[0.8125rem] tracking-tight">
          <a
            href="https://www.instagram.com/porcelaincoffeebar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-glass/80 underline decoration-glass/40 underline-offset-4 transition-colors hover:text-glass"
          >
            <InstagramIcon />
            INSTAGRAM
          </a>
          <a
            href="https://maps.google.com/?q=Porcelain+Coffee+Bar,+3C+Old+Elvet,+Durham+DH1+3HL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-glass/80 underline decoration-glass/40 underline-offset-4 transition-colors hover:text-glass"
          >
            <MapPinIcon />
            GOOGLE MAPS
          </a>
          <a
            href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x487e7d00041573b3:0x9e77cb718e17643a!12e1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-glass/80 underline decoration-glass/40 underline-offset-4 transition-colors hover:text-glass"
          >
            <StarIcon />
            LEAVE A REVIEW
          </a>
        </div>

        <p className="max-w-md font-mono text-[0.6875rem] leading-relaxed tracking-tight text-glass/75">
          UNOFFICIAL DEMO, MADE WITH AFFECTION, NOT AFFILIATION. PHOTOGRAPHS BY
          GOOGLE MAPS CONTRIBUTORS; REVIEWS REAL AND UNEDITED.
        </p>
      </div>
    </footer>
  );
}
