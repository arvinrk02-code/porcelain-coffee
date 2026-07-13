"use client";

import { useEffect, useRef } from "react";

/* The write-a-review button pops out bigger and gives a gentle little shimmy —
   a cute vibration, not a shake — when it first scrolls into view, then again
   every 15 seconds while it stays on screen. Noticed, not nagging. */

const POP: Keyframe[] = [
  { offset: 0, transform: "scale(1) rotate(0deg)", boxShadow: "0 0 0 0 rgba(38,33,28,0)" },
  { offset: 0.13, transform: "scale(1.16) rotate(-2.4deg)", boxShadow: "0 12px 26px 0 rgba(38,33,28,0.2)" },
  { offset: 0.25, transform: "scale(1.15) rotate(2.2deg)" },
  { offset: 0.37, transform: "scale(1.13) rotate(-1.8deg)" },
  { offset: 0.49, transform: "scale(1.1) rotate(1.4deg)", boxShadow: "0 9px 19px 0 rgba(38,33,28,0.15)" },
  { offset: 0.62, transform: "scale(1.08) rotate(-1deg)" },
  { offset: 0.75, transform: "scale(1.05) rotate(0.6deg)" },
  { offset: 0.88, transform: "scale(1.02) rotate(-0.3deg)" },
  { offset: 1, transform: "scale(1) rotate(0deg)", boxShadow: "0 0 0 0 rgba(38,33,28,0)" },
];

export default function ReviewCta() {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let firstPlayed = false;
    let anim: Animation | null = null;

    const play = () => {
      if (!visible || document.hidden) return;
      anim?.cancel();
      anim = el.animate(POP, { duration: 1063, easing: "ease-out" });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !firstPlayed) {
          firstPlayed = true;
          window.setTimeout(play, 400);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    // repeat every 15s — but only while it's actually on screen
    const interval = window.setInterval(play, 15000);

    return () => {
      io.disconnect();
      window.clearInterval(interval);
      anim?.cancel();
    };
  }, []);

  return (
    <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-hairline pt-10">
      <p className="font-serif text-lg italic text-ink">Been in? Pass it on —</p>
      <a
        ref={ctaRef}
        href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x487e7d00041573b3:0x9e77cb718e17643a!12e1"
        target="_blank"
        rel="noopener noreferrer"
        className="decal inline-flex min-h-11 origin-center items-center border border-ink/50 px-7 py-2.5 text-[0.8125rem] tracking-[0.22em] text-ink transition-colors [will-change:transform] hover:border-ink hover:bg-ink/5"
      >
        Write a Google review
      </a>
    </div>
  );
}
