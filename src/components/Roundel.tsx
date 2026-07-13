/* The coaster — recreated from the real one (research/zoom-coaster.png):
   tomato-red disc, circular "PORCELAIN COFFEE" text, chunky angular P. */
export default function Roundel({
  size = 88,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <path
          id="roundel-circle"
          d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
        />
      </defs>
      <circle cx="50" cy="50" r="49" fill="var(--color-roundel)" />
      <text
        fontSize="10.2"
        fontFamily="var(--font-khand), sans-serif"
        fontWeight="500"
        letterSpacing="2.6"
        fill="var(--color-glass)"
      >
        <textPath href="#roundel-circle">
          PORCELAIN COFFEE · PORCELAIN COFFEE ·
        </textPath>
      </text>
      {/* the angular P: squared bowl with a notched cut, stem below */}
      <path
        d="M 41 32 L 63 32 L 63 52 L 58 57 L 47 57 L 47 68 L 41 68 Z
           M 47 38 L 47 51 L 55.5 51 L 57 49.5 L 57 38 Z"
        fill="var(--color-glass)"
        fillRule="evenodd"
      />
    </svg>
  );
}
