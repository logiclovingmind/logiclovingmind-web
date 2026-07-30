import type { MetadataRoute } from "next";
import { ROUTES, SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: new URL(route.href, SITE.url).toString(),
    changeFrequency: "monthly",
    priority: route.href === "/" ? 1 : 0.8,
  }));
}
