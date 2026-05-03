import { redirect } from "next/navigation";
import { SITE } from "@/lib/utils";

/** /book — English short URL for booking. */
export function GET() {
  redirect(SITE.doctolib.url);
}
