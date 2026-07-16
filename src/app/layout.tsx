import type { Metadata, Viewport } from "next";
import { Khand, Literata, Fragment_Mono } from "next/font/google";
import "./globals.css";

/*
  Khand — matched against the shop's real window decal (flat-topped A, squared
  terminals, open counters; see research/zoom-signage-right.png vs type-test).
  Literata — bookish body, the wood-panelled reading-nook register.
  Fragment Mono — receipt/price-tag register for hours and data.
*/
const khand = Khand({
  variable: "--font-khand",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Swap for the real domain on deploy — used to resolve og/twitter image URLs.
const SITE_URL = "https://porcelain-coffee.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Porcelain Coffee Bar · Speciality Coffee on Old Elvet, Durham",
  description:
    "Independent, family-run speciality coffee bar at 3C Old Elvet, Durham. Proper flat whites on locally roasted Fika beans, homemade cakes, dogs welcome. Open 8:30–5, closed Tuesdays.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Porcelain Coffee Bar",
    locale: "en_GB",
    title: "Porcelain Coffee Bar · Old Elvet, Durham",
    description:
      "Proper flat whites, homemade cakes. Green front, wood inside. Open 8:30–5, closed Tuesdays.",
    images: ["/photos/shopfront.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Porcelain Coffee Bar · Old Elvet, Durham",
    description: "Proper flat whites, homemade cakes. Green front, wood inside.",
    images: ["/photos/shopfront.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#46691e", // the shopfront green
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${khand.variable} ${literata.variable} ${fragmentMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
