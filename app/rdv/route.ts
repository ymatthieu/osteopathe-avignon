import { redirect } from "next/navigation";
import { SITE } from "@/lib/utils";

/** /rdv — short URL to send by SMS or print on a card. */
export function GET() {
  redirect(SITE.doctolib.url);
}
