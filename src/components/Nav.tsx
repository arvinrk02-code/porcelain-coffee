/* Two ghost buttons floating over the green — the hero is the wordmark;
   the buttons just need to be findable. */
export default function Nav() {
  const link =
    "decal pointer-events-auto inline-flex min-h-11 items-center border border-glass/60 px-6 py-2 " +
    "text-[0.8125rem] tracking-[0.22em] text-glass transition-colors " +
    "hover:bg-glass/10 hover:border-glass";

  return (
    // container is click-through so the empty middle doesn't steal clicks
    // from the pendant lamps hanging behind it; the links opt back in.
    <nav
      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-9 py-9 sm:px-14 sm:py-12"
      aria-label="Main"
    >
      <a href="#menu" className={link}>
        Menu
      </a>
      <a href="#visit" className={link}>
        Find us
      </a>
    </nav>
  );
}
