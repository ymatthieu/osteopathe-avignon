import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Single source of truth for site-wide constants.
 *
 * IMPORTANT for SEO: keep `name`, `address`, and `phone` IDENTICAL across:
 *   - Google Business Profile
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

  // TODO — for #1 ranking, add a phone number here. Format: "+33 X XX XX XX XX".
  // Without it, Pages Jaunes and several local directories will reject the listing,
  // and the schema.org `telephone` field stays empty. Use a virtual number
  // (Onoff / OVH / Free Mobile e-SIM) if you'd rather not publish a personal mobile.
  // Example once set:    phone: "+33 4 90 XX XX XX",
  phone: null as string | null,

  address: {
    street: "38 Avenue Saint-Ruf",
    postalCode: "84000",
    city: "Avignon",
    country: "FR",
    latitude: 43.940887,
    longitude: 4.812968,
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
