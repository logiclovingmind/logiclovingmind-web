import type { MetadataRoute } from "next";
import { LEGAL_ROUTES, ROUTES, SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTES.map((route) => ({
      url: new URL(route.href, SITE.url).toString(),
      changeFrequency: "monthly" as const,
      priority: route.href === "/" ? 1 : 0.8,
    })),
    ...LEGAL_ROUTES.map((route) => ({
      url: new URL(route.href, SITE.url).toString(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
