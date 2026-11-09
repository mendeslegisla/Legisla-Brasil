import type { NextConfig } from "next";

// Exportação estática: `npm run build` gera a pasta out/ com HTML pronto,
// que pode ser hospedada em Vercel, Netlify, Cloudflare Pages ou GitHub Pages.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
