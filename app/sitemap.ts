import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Each route present in both locales with hreflang alternates
  const routes = ["", "/about", "/services", "/tarifs", "/faq", "/contact"];

  return routes.flatMap((route) => [
    {
      url: `${SITE.url}${route}`,
      lastModified,
      changeFrequency: "monthly",
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          fr: `${SITE.url}${route}`,
          "fr-FR": `${SITE.url}${route}`,
          en: `${SITE.url}/en${route}`,
          "en-GB": `${SITE.url}/en${route}`,
          "en-US": `${SITE.url}/en${route}`,
          "x-default": `${SITE.url}${route}`,
        },
      },
    },
  ]);
}
