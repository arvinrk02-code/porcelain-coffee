import Image from "next/image";
import OpenChip from "./OpenChip";
import WatercolourEdge from "./WatercolourEdge";
import { HOURS_ROWS } from "@/lib/hours";
import benches from "../../public/photos/benches.jpeg";

/* Leaving through the door you came in: back to the green, with everything
   you need to actually turn up. */
export default function Visit() {
  return (
    <section
      id="visit"
      className="relative mt-6 scroll-mt-0 bg-shopfront text-glass"
      aria-label="Find us"
    >
      <WatercolourEdge className="absolute inset-x-0 top-0 h-5 -translate-y-full text-shopfront" />
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:grid-cols-[1.1fr_1fr] sm:gap-16 sm:py-28">
        <div>
          <h2 className="decal pl-[0.3em] text-[1.05rem] tracking-[0.3em]">Find us</h2>

          <p className="mt-8 font-serif text-[clamp(1.5rem,3vw,2rem)] leading-snug text-balance">
            Just over Elvet Bridge. Look for the green front.
          </p>

          <address className="mt-6 font-serif text-lg not-italic leading-relaxed text-glass/90">
            3C Old Elvet, Durham DH1 3HL
          </address>

          <table className="mt-10 w-full max-w-xs font-mono text-[0.875rem] tabular-nums">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {HOURS_ROWS.map((row) => (
                <tr key={row.days} className="border-b border-glass/20">
                  <th scope="row" className="py-2.5 text-left font-normal text-glass/80">
                    {row.days}
                  </th>
                  <td className={`py-2.5 text-right ${row.closed ? "text-glass/60 italic" : ""}`}>
                    {row.times}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <OpenChip onGreen />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="https://maps.google.com/?q=Porcelain+Coffee+Bar,+3C+Old+Elvet,+Durham+DH1+3HL"
              target="_blank"
              rel="noopener noreferrer"
              className="decal inline-flex min-h-11 items-center border border-glass/70 px-7 py-2.5 text-[0.8125rem] tracking-[0.22em] transition-colors hover:bg-glass/10"
            >
              Open in maps
            </a>
            <p className="font-serif text-[0.9375rem] italic text-glass/80">
              Dogs welcome. There’s a bowl by the door.
            </p>
          </div>

          <p className="mt-8 font-mono text-[0.8125rem] tracking-tight text-glass/80">
            <a
              href="https://www.instagram.com/porcelaincoffeebar/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-glass/40 underline-offset-4 transition-colors hover:text-glass"
            >
              @PORCELAINCOFFEEBAR
            </a>{" "}
            FOR TODAY’S BAKES
          </p>
        </div>

        <figure className="self-center">
          <Image
            src={benches}
            alt="The benches under the shop window, café curtains behind the glass."
            className="w-full"
            sizes="(min-width: 640px) 45vw, 100vw"
            placeholder="blur"
          />
        </figure>
      </div>
    </section>
  );
}
