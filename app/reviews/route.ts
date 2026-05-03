import { redirect } from "next/navigation";
import { SITE } from "@/lib/utils";

/** /reviews — English short URL to leave a Google review. See /avis for details. */
const OVERRIDE = process.env.NEXT_PUBLIC_GBP_REVIEW_URL || "";

export function GET() {
  redirect(OVERRIDE || SITE.gbp.reviewUrl);
}
