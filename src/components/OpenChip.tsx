"use client";

import { useEffect, useState } from "react";
import { openState, type OpenState } from "@/lib/hours";

/* Live open/closed chip from the real hours. Client-only (clock), so it
   renders a quiet placeholder until mounted — no hydration mismatch. */
export default function OpenChip({ onGreen = false }: { onGreen?: boolean }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(openState());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const dot = state
    ? state.open
      ? "bg-shopfront-lit"
      : "bg-roundel"
    : "bg-hairline";

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[0.8125rem] tracking-tight ${
        onGreen ? "text-glass/90" : "text-ink-soft"
      }`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`inline-block size-[7px] rounded-full ${dot}`}
        aria-hidden
      />
      {state ? state.label : "Hours: 8:30–5, closed Tue"}
    </span>
  );
}
