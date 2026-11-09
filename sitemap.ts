import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

const ROUTES = ["", "mandatos", "partidos", "comunidade", "publicacoes", "na-midia", "quem-somos", "equipe", "parceiros", "transparencia", "contato", "programa-pll", "programa-nex", "politica-de-privacidade", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `${SITE.url}/${r ? `${r}/` : ""}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
