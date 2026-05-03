/**
 * Real Google reviews collected on the public Google Business Profile.
 * These are public, attributed reviews — quoted verbatim with the reviewer's
 * display name, the original date, and a link back to the GBP page so anyone
 * can verify the source.
 *
 * IMPORTANT — French law:
 *   - DGCCRF / Code de la consommation L121-2 prohibits fake or unverified
 *     reviews from a healthcare practice. Every entry below is a real,
 *     publicly visible Google review on the verified GBP profile.
 *   - We never invent quotes, never paraphrase, never re-edit.
 *   - When the GBP profile gets new reviews, simply add them here in the same
 *     shape and the homepage section + JSON-LD pick them up automatically.
 *
 * Aggregate stats are also exported here so the JSON-LD AggregateRating
 * mirrors exactly what Google shows.
 */

export type Review = {
  id: string;
  /** Reviewer's display name as shown on Google (do not edit). */
  author: string;
  /** ISO date of the review (YYYY-MM-DD), best-effort from "il y a X" labels. */
  date: string;
  /** Star rating, 1-5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Original review language (the body is always shown in this language). */
  lang: "fr" | "en";
  /** Verbatim review body — never edit. */
  body: string;
  /**
   * Optional translation, displayed as a small italic block below the original
   * on the other-locale page so non-readers get the gist. Keep this short and
   * mark it clearly as a translation.
   */
  translations?: { fr?: string; en?: string };
};

export const REVIEWS: Review[] = [
  {
    id: "jonathan-claudel-2026-04",
    author: "Jonathan Claudel",
    date: "2026-04-15",
    rating: 5,
    lang: "fr",
    body: "Bonne expérience. Praticien sympathique, qui prend le temps d'expliquer sa démarche de façon claire. Sérieux et compétent, je me suis senti en confiance pendant la séance. Je recommande.",
    translations: {
      en: "Great experience. Friendly practitioner who takes the time to clearly explain his approach. Serious and skilled — I felt at ease during the session. Highly recommended.",
    },
  },
];

export const REVIEW_STATS = {
  count: REVIEWS.length,
  average:
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / Math.max(REVIEWS.length, 1),
} as const;
