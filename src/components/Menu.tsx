"use client";

import { useCallback, useRef } from "react";

/* The menu, straight from the shop's printed card (photographed July 2026).
   Set like the card itself: hairline frame, dotted leaders to the prices, the
   same ink line-art as the shopfront drawing. Easter egg: resting on an item
   sets a faint coffee-ring down at the cursor, like cups on a table while you
   decide. The rings are plain DOM + Web Animations (decorative, aria-hidden). */

type Row = {
  name: string;
  price?: string;
  desc?: string;
};

type Group = {
  title: string;
  icon: React.ReactNode;
  intro?: string;
  rows: Row[];
  footer?: string;
};

const COFFEE: Row[] = [
  { name: "Espresso", price: "3" },
  { name: "Long black", price: "3.5" },
  { name: "Americano", price: "3.5" },
  { name: "Flat white", price: "3.8" },
  { name: "Latte or cappuccino", price: "3.8" },
  { name: "Mocha", price: "4.5" },
  { name: "Chai latte", price: "4" },
  { name: "Matcha latte", price: "4.25" },
  { name: "Hot chocolate", price: "4", desc: "with cream & marshmallows, 4.75" },
];

const ICED: Row[] = [
  { name: "Iced latte", price: "3.95" },
  { name: "Iced americano", price: "3.65" },
  { name: "Iced matcha", price: "4.5", desc: "with blueberry compote, 5" },
];

const TOASTIES: Row[] = [
  { name: "Grilled cheese (v)", desc: "cheddar, Emmental, gouda, sriracha mayo" },
  { name: "Croque", desc: "thick smoked ham, cheese, Dijon mustard, Mornay sauce, cornichon" },
  { name: "Reuben", desc: "pastrami beef, Swiss cheese, sauerkraut, island sauce, cornichon" },
  { name: "Caponata (vg)", desc: "aubergine relish, olive tapenade, rocket" },
  { name: "Toast with raspberry jam (v)", price: "3.5" },
  { name: "Pea & mint soup (vg)", price: "6.5", desc: "with sourdough & pine nuts" },
  { name: "Soup & a toastie", price: "10" },
];

const TEA_AND_BOTTLES: Row[] = [
  {
    name: "Pot of loose-leaf tea",
    price: "2.5",
    desc: "breakfast, decaf, Earl Grey, peppermint, gunpowder green, vanilla rooibos, berry",
  },
  { name: "Mug of Yorkshire tea", price: "2.5" },
  {
    name: "Soft drinks",
    price: "3.5",
    desc: "Karma Cola, Gingerella, Lemony Lemon, Razza raspberry, San Pellegrino",
  },
  { name: "Fresh orange juice", price: "6", desc: "half bottle, 3.5" },
  { name: "Chocolate milk", price: "5", desc: "half bottle, 3" },
];

const SWEET: Row[] = [{ name: "Affogato (v)", price: "4.5" }];

const SVG_NS = "http://www.w3.org/2000/svg";
const RING_STROKE = "oklch(0.42 0.07 50 / 0.5)";

/* hand-drawn marks, same stroke language as the shopfront */
function CupIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-9 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M10 22 C10 34 15 40 24 40 C33 40 37 34 37 22 Z" />
      <path d="M37 25 C43 24 44 32 37 33" />
      <ellipse cx="23.5" cy="22" rx="13.5" ry="3" strokeWidth="1.5" />
      <path d="M20 14 C17 11 22 9 20 6" strokeWidth="1.5" />
      <path d="M27 15 C24 12 29 10 27 7" strokeWidth="1.5" />
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-9 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 8 L16.5 42 H31.5 L34 8 Z" />
      <path d="M15 16 H33" strokeWidth="1.5" />
      <rect x="19" y="21" width="7" height="7" rx="1.5" strokeWidth="1.5" transform="rotate(8 22.5 24.5)" />
      <rect x="23" y="30" width="6" height="6" rx="1.5" strokeWidth="1.5" transform="rotate(-11 26 33)" />
      <path d="M28 8 L36 3" strokeWidth="1.5" />
    </svg>
  );
}

function ToastIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-9 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 20 C6 20 6 12 12 11 C13 6 21 5 24 8 C27 5 35 6 36 11 C42 12 42 20 38 20 V40 H10 Z" />
      <path d="M10 28 C15 25 20 30 24 27 C28 24 33 29 38 26" strokeWidth="1.5" />
      <path d="M16 34 L18 36 M28 33 L30 35" strokeWidth="1.5" />
    </svg>
  );
}

function TeapotIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-9 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 20 C10 26 10 33 14 38 H34 C38 33 38 26 34 20 C29 17 19 17 14 20 Z" />
      <path d="M14 24 C9 24 6 28 8 32 C9 34 11 35 12 35" strokeWidth="1.5" />
      <path d="M34 24 C39 22 42 26 40 30" strokeWidth="1.5" />
      <path d="M20 17 C20 14 22 13 24 13 C26 13 28 14 28 17" strokeWidth="1.5" />
      <circle cx="24" cy="11" r="1.6" strokeWidth="1.5" />
    </svg>
  );
}

function CakeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-9 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

function MenuGroup({
  group,
  onRest,
}: {
  group: Group;
  onRest: (e: React.PointerEvent) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3.5">
        {group.icon}
        <h3 className="font-serif text-[1.45rem] font-semibold italic">
          {group.title}
        </h3>
      </div>
      {group.intro && (
        <p className="mt-3 font-serif text-[0.9375rem] italic leading-relaxed text-ink-soft">
          {group.intro}
        </p>
      )}
      <ul className="mt-6 space-y-4">
        {group.rows.map((row) => (
          <li key={row.name}>
            <span
              onPointerEnter={onRest}
              onPointerDown={onRest}
              className="group block cursor-default"
            >
              <span className="flex w-full items-baseline">
                <span className="font-serif text-[1.0625rem] leading-snug transition-colors group-hover:text-shopfront-deep">
                  {row.name}
                </span>
                {row.price && (
                  <>
                    <span
                      aria-hidden
                      className="mx-3 flex-1 border-b border-dotted border-ink/30 translate-y-[-0.28em]"
                    />
                    <span className="shrink-0 font-mono text-[0.8125rem] text-ink">
                      {row.price}
                    </span>
                  </>
                )}
              </span>
              {row.desc && (
                <span className="mt-1 block pr-10 font-mono text-[0.71rem] leading-relaxed text-ink-soft">
                  {row.desc}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      {group.footer && (
        <p className="mt-5 font-serif text-[0.9375rem] italic leading-relaxed text-ink-soft">
          {group.footer}
        </p>
      )}
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

  const groups: { left: Group[]; right: Group[] } = {
    left: [
      {
        title: "Coffee",
        icon: <CupIcon />,
        rows: COFFEE,
        footer:
          "Our house blend is Fika Roasters' Brazilian Bom Jesus and Uganda Maliba: chocolate orange, praline, a buttery body.",
      },
      {
        title: "Iced",
        icon: <GlassIcon />,
        intro: "Served in 12oz glasses.",
        rows: ICED,
        footer: "Oat milk switch is free. Vanilla or caramel syrup, 50p.",
      },
    ],
    right: [
      {
        title: "Toasties",
        icon: <ToastIcon />,
        intro: "On our sourdough, all 7.",
        rows: TOASTIES,
      },
      {
        title: "Tea & bottles",
        icon: <TeapotIcon />,
        rows: TEA_AND_BOTTLES,
      },
      {
        title: "Sweet",
        icon: <CakeIcon />,
        intro: "Our cakes change all the time. See the counter for today's.",
        rows: SWEET,
      },
    ],
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-5xl scroll-mt-8 px-6 py-24 sm:py-32"
      aria-label="Menu"
    >
      {/* coffee rings land here, decoration only */}
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

        <p className="mt-5 text-center font-mono text-[0.71rem] tracking-tight text-ink-soft">
          PRICES IN POUNDS · V VEGETARIAN · VG VEGAN
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-14 sm:grid-cols-2">
          <div className="space-y-14">
            {groups.left.map((g) => (
              <MenuGroup key={g.title} group={g} onRest={setDownCup} />
            ))}
          </div>
          <div className="space-y-14">
            {groups.right.map((g) => (
              <MenuGroup key={g.title} group={g} onRest={setDownCup} />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-xl text-center font-mono text-[0.71rem] leading-relaxed tracking-tight text-ink-soft">
          PLEASE TELL US ABOUT ANY ALLERGIES BEFORE ORDERING. AN ALLERGEN MENU
          IS AVAILABLE, AND OUR SMALL KITCHEN HANDLES ALL MAJOR ALLERGENS.
        </p>
      </div>
    </section>
  );
}
