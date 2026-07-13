import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → `next build` writes an `out/` folder that the
  // GitHub Pages workflow uploads. Without this there is no `out/` to deploy.
  output: "export",
  // Static hosts have no image-optimizer server, so serve originals as-is.
  // (The Pages workflow's configure-pages step also sets this + basePath.)
  images: { unoptimized: true },
};

export default nextConfig;
