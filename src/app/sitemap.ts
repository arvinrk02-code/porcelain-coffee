import type { MetadataRoute } from "next";

// required for `output: export` — generate this at build time, not per-request
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://arvinrk02-code.github.io/porcelain-coffee/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
