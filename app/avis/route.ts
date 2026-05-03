import { redirect } from "next/navigation";
import { SITE } from "@/lib/utils";

/**
 * /avis — short URL for patients to leave a Google review.
 * Redirects to the verified GBP. The user lands there and taps "Donner un avis".
 *
 * To enable a true one-click flow, generate a short g.page review link from the
 * GBP dashboard (Avis → "Demander des avis" → "Partager") and set it via the
 * NEXT_PUBLIC_GBP_REVIEW_URL env var in Vercel — the override below picks it up.
 */
const OVERRIDE = process.env.NEXT_PUBLIC_GBP_REVIEW_URL || "";

export function GET() {
  redirect(OVERRIDE || SITE.gbp.reviewUrl);
}
