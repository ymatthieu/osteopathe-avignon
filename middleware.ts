import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // /  for FR, /en for English
  localeDetection: false,
});

export const config = {
  // Match everything except static files / API routes / Next internals
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
