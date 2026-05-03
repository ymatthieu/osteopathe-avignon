import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

/**
 * Sitemap — only routes that actually exist as pages.
 * Section-anchor URLs (#about, #services etc.) are NOT separate URLs and must
 * not be in here, or Search Console will report 404s.
 *
 * As real subpages are added (e.g. /services/pediatrie, /blog/...), add them here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        fr: `${SITE.url}${path}`,
        "fr-FR": `${SITE.url}${path}`,
        en: `${SITE.url}/en${path}`,
        "en-GB": `${SITE.url}/en${path}`,
        "en-US": `${SITE.url}/en${path}`,
        "x-default": `${SITE.url}${path}`,
      },
    },
  }));
}
