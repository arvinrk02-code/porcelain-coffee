import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://porcelain-coffee-demo.vercel.app/sitemap.xml",
  };
}
