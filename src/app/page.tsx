import Image from "next/image";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import ShopfrontLineArt from "@/components/ShopfrontLineArt";
import WatercolourEdge from "@/components/WatercolourEdge";

import flatWhites from "../../public/photos/flat-whites.jpeg";
import cabinet from "../../public/photos/cake-cabinet.jpeg";
import doorInside from "../../public/photos/door-inside.jpeg";
import counter from "../../public/photos/counter.jpeg";
import room from "../../public/photos/room.jpeg";

const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Porcelain Coffee Bar",
  alternateName: "Porcelain Coffee",
  description:
    "Independent, family-run speciality coffee bar on Old Elvet, Durham. Flat whites on locally roasted Fika beans, homemade cakes, dogs welcome.",
  image: "/photos/shopfront.jpeg",
  servesCuisine: ["Coffee", "Cakes"],
  priceRange: "£",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3C Old Elvet",
    addressLocality: "Durham",
    postalCode: "DH1 3HL",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 54.7754415,
    longitude: -1.5716431,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:30",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/porcelaincoffeebar/",
    "https://maps.google.com/?q=Porcelain+Coffee+Bar,+3C+Old+Elvet,+Durham+DH1+3HL",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 81,
  },
};

export default function Home() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_LD) }}
      />
      <a
        href="#menu"
        className="decal sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-porcelain focus:px-4 focus:py-2 focus:text-[0.8125rem] focus:tracking-[0.22em] focus:text-ink"
      >
        Skip to the menu
      </a>
      <Nav />
      <Hero />
      <main>

      {/* ------ welcome: you've stepped off the street ------ */}
      <section
        id="welcome"
        className="mx-auto grid w-full max-w-5xl scroll-mt-8 items-center gap-12 px-6 pt-14 sm:grid-cols-[1.2fr_1fr] sm:gap-16 sm:pt-20"
        aria-label="Welcome"
      >
        <div>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-balance">
            Hello. We’re Porcelain.
          </h2>
          <div className="mt-8 max-w-xl space-y-5 font-serif text-[1.0625rem] leading-[1.7] text-ink">
            <p>
              A dad-and-daughter coffee bar in a green Victorian shopfront on
              Old Elvet. We pull proper flat whites on Fika beans, roasted up
              the road in the North East, and bake our own cakes, labelled by
              hand at the counter.
            </p>
            <p className="text-ink-soft italic">
              That’s the whole pitch. The rest is better in person.
            </p>
          </div>
        </div>
        <ShopfrontLineArt className="mx-auto w-full max-w-sm text-ink sm:max-w-none" />
      </section>

      <Menu />

      {/* ------ photo band: the table, the cabinet ------ */}
      <section className="mx-auto w-full max-w-6xl px-6" aria-label="Photographs">
        <div className="grid gap-5 sm:grid-cols-[2fr_3fr]">
          <figure>
            <Image
              src={flatWhites}
              alt="Two flat whites in white porcelain cups either side of the red Porcelain coaster."
              className="h-full w-full object-cover"
              sizes="(min-width: 640px) 40vw, 100vw"
              placeholder="blur"
            />
          </figure>
          <figure>
            <Image
              src={cabinet}
              alt="The cake cabinet: traybakes with piped cream, and a handwritten label for the pecan and banana loaf."
              className="h-full w-full object-cover"
              sizes="(min-width: 640px) 60vw, 100vw"
              placeholder="blur"
            />
          </figure>
        </div>
      </section>

      {/* ------ inside: the mahogany room, photos do the talking ------ */}
      <section
        className="relative mt-28 bg-mahogany text-porcelain sm:mt-36"
        aria-label="Inside the shop"
      >
        <WatercolourEdge className="absolute inset-x-0 top-0 h-5 -translate-y-full text-mahogany" />
        <WatercolourEdge flip className="absolute inset-x-0 bottom-0 h-5 translate-y-full text-mahogany" />
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <div className="flex items-baseline gap-4">
            <h2 className="decal pl-[0.3em] text-[1.05rem] tracking-[0.3em]">
              Inside
            </h2>
            <div aria-hidden className="h-px flex-1 bg-porcelain/25" />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-[1fr_2fr_1.1fr]">
            <figure>
              <Image
                src={doorInside}
                alt="The door from inside: lamplight, café curtains, and the CLOSED sign waiting to be flipped."
                className="h-full w-full object-cover"
                sizes="(min-width: 640px) 24vw, 100vw"
                placeholder="blur"
              />
            </figure>
            <figure>
              <Image
                src={counter}
                alt="Behind the counter: the cake cabinet, the waffle iron, tulips beside the espresso machine."
                className="h-full w-full object-cover"
                sizes="(min-width: 640px) 48vw, 100vw"
                placeholder="blur"
              />
            </figure>
            <figure>
              <Image
                src={room}
                alt="The room: customers at the tables under the model sailboat."
                className="h-full w-full object-cover"
                sizes="(min-width: 640px) 27vw, 100vw"
                placeholder="blur"
              />
            </figure>
          </div>

          <p className="mt-8 max-w-2xl font-serif text-lg italic leading-relaxed text-porcelain/90">
            Mahogany panelling, globe lamps, a model sailboat on the shelf,
            and the saucers have our name round the rim.
          </p>
        </div>
      </section>

      <Reviews />
      <Visit />
      </main>
      <Footer />
    </div>
  );
}
