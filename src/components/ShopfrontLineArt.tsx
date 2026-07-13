"use client";

import { useEffect, useRef, useState } from "react";

/* Continuous-line drawing of the actual shopfront elevation — fascia, two
   curtained windows, the door with its brass letterbox, benches, and the dog
   bowl. Drawn from clean-01-shopfront.jpeg, not imagination.
   The door opens. Of course it does. */
export default function ShopfrontLineArt({
  className = "",
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // the door opens by itself the first time you see the shop
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          const t = setTimeout(() => setOpen(true), 650);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={`relative ${className}`}>
      <svg
        viewBox="0 0 520 420"
        className="w-full"
        role="img"
        aria-label="Line drawing of the shopfront at 3C Old Elvet: two curtained windows either side of the door, benches out front, a dog bowl by the step."
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* cornice */}
        <path d="M30 40 H490" />
        <path d="M38 48 H482" strokeWidth="1.5" />

        {/* fascia band */}
        <rect x="44" y="56" width="432" height="52" />
        <text
          x="260"
          y="92"
          textAnchor="middle"
          stroke="none"
          fill="currentColor"
          fontFamily="var(--font-khand), sans-serif"
          fontWeight="500"
          fontSize="21"
          letterSpacing="9"
        >
          PORCELAIN
        </text>

        {/* pilasters */}
        <path d="M52 108 V358" />
        <path d="M468 108 V358" />

        {/* left window */}
        <rect x="68" y="124" width="136" height="226" strokeWidth="2" />
        <path d="M68 228 H204" strokeWidth="1.5" />
        <path d="M80 232 C78 270 82 310 79 346" strokeWidth="1.5" />
        <path d="M104 232 C106 272 102 308 105 346" strokeWidth="1.5" />
        <path d="M128 232 C126 268 130 312 127 346" strokeWidth="1.5" />
        <path d="M152 232 C154 270 150 310 153 346" strokeWidth="1.5" />
        <path d="M176 232 C174 272 178 306 175 346" strokeWidth="1.5" />
        <path d="M70 348 C90 344 110 350 130 347 C155 344 180 350 202 347" strokeWidth="1.5" />
        <circle cx="136" cy="176" r="11" strokeWidth="2" />
        <path d="M136 124 V165" strokeWidth="1.2" />

        {/* doorway (behind the door) */}
        <rect x="222" y="124" width="76" height="232" strokeWidth="2" />

        {/* --- door, closed --- */}
        <g
          className="transition-opacity duration-500"
          style={{ opacity: open ? 0 : 1 }}
        >
          <path d="M222 172 H298" strokeWidth="1.5" />
          <rect x="234" y="188" width="52" height="66" strokeWidth="1.5" />
          <rect x="234" y="268" width="52" height="66" strokeWidth="1.5" />
          <rect x="246" y="240" width="28" height="7" rx="2" strokeWidth="1.5" />
          {/* knob on the left — opposite the right-hand hinge */}
          <circle cx="232" cy="246" r="4" strokeWidth="1.5" />
        </g>

        {/* --- door, open: warm light, the leaf swung inward, steam --- */}
        <g
          className="transition-opacity duration-500"
          style={{ opacity: open ? 1 : 0 }}
          aria-hidden={!open}
        >
          {/* lamplight spilling through the doorway */}
          <rect
            x="224"
            y="126"
            width="72"
            height="228"
            fill="oklch(0.93 0.045 90)"
            stroke="none"
          />
          {/* the counter, glimpsed */}
          <path d="M232 300 H288" strokeWidth="1.5" />
          <path d="M238 300 V330 M282 300 V330" strokeWidth="1.2" />
          {/* steam curling out */}
          <path
            d="M258 280 C252 268 264 262 258 250 C252 238 264 232 259 222"
            strokeWidth="1.5"
          />
          {/* door leaf swung inward, hinged at the right edge of the frame */}
          <path d="M298 124 L272 142 L272 338 L298 356 Z" strokeWidth="2" />
          <path d="M290 150 V336" strokeWidth="1.2" />
        </g>

        {/* threshold + step */}
        <path d="M222 356 H298" strokeWidth="1.5" />
        <path d="M216 366 H304" />

        {/* benches */}
        <path d="M76 372 H196" />
        <path d="M84 372 L78 396 M116 372 L114 396 M156 372 L158 396 M188 372 L194 396" strokeWidth="2" />
        <path d="M324 372 H444" />
        <path d="M332 372 L326 396 M364 372 L362 396 M404 372 L406 396 M436 372 L442 396" strokeWidth="2" />

        {/* right window */}
        <rect x="316" y="124" width="136" height="226" strokeWidth="2" />
        <path d="M316 228 H452" strokeWidth="1.5" />
        <path d="M328 232 C326 270 330 310 327 346" strokeWidth="1.5" />
        <path d="M352 232 C354 272 350 308 353 346" strokeWidth="1.5" />
        <path d="M376 232 C374 268 378 312 375 346" strokeWidth="1.5" />
        <path d="M400 232 C402 270 398 310 401 346" strokeWidth="1.5" />
        <path d="M424 232 C422 272 426 306 423 346" strokeWidth="1.5" />
        <path d="M318 348 C338 344 358 350 378 347 C403 344 428 350 450 347" strokeWidth="1.5" />
        <circle cx="384" cy="176" r="11" strokeWidth="2" />
        <path d="M384 124 V165" strokeWidth="1.2" />

        {/* the dog bowl */}
        <ellipse cx="306" cy="392" rx="13" ry="4.5" strokeWidth="2" />
        <path d="M295 385 C295 389 317 389 317 385" strokeWidth="1.5" />

        {/* pavement */}
        <path d="M24 404 H496" strokeWidth="1.5" />
        <path d="M120 404 L114 412 M260 404 L258 412 M390 404 L394 412" strokeWidth="1" />
      </svg>

      {/* real button over the door — keyboard reachable, honest hit area */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-pressed={open}
        aria-label={open ? "Close the door" : "Open the door"}
        title={open ? "Close the door" : "Open the door"}
        className="absolute cursor-pointer"
        style={{
          left: "42%",
          top: "29%",
          width: "16%",
          height: "57%",
        }}
      />
    </div>
  );
}
