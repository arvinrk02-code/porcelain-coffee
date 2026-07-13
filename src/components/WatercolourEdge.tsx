/* A soft, irregular pigment edge for the coloured bands — the watercolour
   motif carried through the page at a whisper. Set the text colour to the
   band's colour; flip renders the mirror edge for a band's bottom. */
export default function WatercolourEdge({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 26"
      preserveAspectRatio="none"
      aria-hidden
      className={`block w-full fill-current ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d="M0 26 L0 15 C55 9 118 19 196 13 C274 7 336 17 428 12 C520 7 585 18 676 13 C767 8 838 19 928 13 C1018 7 1092 17 1200 11 L1200 26 Z" />
      <ellipse cx="150" cy="7" rx="26" ry="3.2" opacity="0.5" />
      <ellipse cx="521" cy="6" rx="18" ry="2.6" opacity="0.4" />
      <ellipse cx="866" cy="7.5" rx="30" ry="3" opacity="0.45" />
      <ellipse cx="1080" cy="5.5" rx="14" ry="2.2" opacity="0.35" />
    </svg>
  );
}
