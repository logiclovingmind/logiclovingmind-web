import type { MetadataRoute } from "next";
import { LEGAL_ROUTES, SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    {
      url: new URL("/work", SITE.url).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...LEGAL_ROUTES.map((route) => ({
      url: new URL(route.href, SITE.url).toString(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
