import { redirect } from "next/navigation";
import { SITE } from "@/lib/utils";

/**
 * /avis — short, memorable URL to give to patients so they can leave a review.
 *
 * Once Google Business Profile is set up, replace the fallback with the GBP
 * "write a review" deep link, which has the format:
 *   https://search.google.com/local/writereview?placeid=<PLACE_ID>
 * or the shortlink:
 *   https://g.page/r/<PAGE_ID>/review
 *
 * Until then, we redirect to Doctolib where patients can rate the consultation.
 */
const GBP_REVIEW_URL = process.env.NEXT_PUBLIC_GBP_REVIEW_URL || "";

export function GET() {
  redirect(GBP_REVIEW_URL || SITE.doctolib.url);
}
