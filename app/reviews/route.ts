import { redirect } from "next/navigation";
import { SITE } from "@/lib/utils";

/** /reviews — English short URL to leave a review. See /avis for details. */
const GBP_REVIEW_URL = process.env.NEXT_PUBLIC_GBP_REVIEW_URL || "";

export function GET() {
  redirect(GBP_REVIEW_URL || SITE.doctolib.url);
}
