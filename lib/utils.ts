import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Single source of truth for site-wide constants.
 *
 * IMPORTANT for SEO: keep `name`, `address`, and `phone` IDENTICAL across:
 *   - Google Business Profile (already verified — see SITE.gbp below)
 *   - Doctolib
 *   - Pages Jaunes
 *   - Conseil National de l'Ostéopathie
 *   - any other directory
 * Google's local algorithm cross-references these and demotes inconsistent NAP.
 */
export const SITE = {
  url: "https://www.osteopatheavignon.com",
  name: "Cabinet d'Ostéopathie Matthieu Yeghiazarian",
  shortName: "Matthieu Yeghiazarian, Ostéopathe D.O.",
  tagline: { fr: "Mouvement • Précision • Performance", en: "Movement • Precision • Performance" },
  email: "matt@osteopatheavignon.com",

  // E.164 international format for tel: links and schema.org telephone field.
  // Display format on the page is rebuilt from this (see phoneDisplay).
  phone: "+33 6 32 04 47 74",
  phoneDisplay: "06 32 04 47 74",

  address: {
    street: "38 Avenue Saint-Ruf",
    postalCode: "84000",
    city: "Avignon",
    country: "FR",
    // Coordinates aligned with Google Business Profile pin (verified 2026-05).
    latitude: 43.9387465,
    longitude: 4.8097778,
  },

  // Google Business Profile — verified, owner: avignonosteopathie@gmail.com
  // CID = decimal form of the FTID hex tail, used in canonical Maps URL.
  // Place name knowledge-graph ID: /g/11yxp9jhqt
  gbp: {
    cid: "9144548058221246800",
    mapsUrl: "https://www.google.com/maps?cid=9144548058221246800",
    // /avis redirects here. From the GBP page users tap "Avis" → "Donner un avis".
    // Once we have a g.page short link from GBP dashboard, replace this for one-click flow.
    reviewUrl: "https://www.google.com/maps?cid=9144548058221246800",
  },

  doctolib: {
    practitionerSlug: "matthieu-yeghiazarian-d2fbe124-f319-4146-b120-cd86de546b37",
    url: "https://www.doctolib.fr/osteopathe/avignon/matthieu-yeghiazarian-d2fbe124-f319-4146-b120-cd86de546b37",
  },
  hours: [
    { day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "13:00" },
    { day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:00", closes: "19:00" },
    { day: "Saturday", opens: "09:00", closes: "12:00" },
  ],
  experienceYears: 16,
  pricing: 60,
  sessionMinutes: 45,
} as const;
