"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales } from "@/lib/i18n";

/**
 * Switches the current path between locales.
 * Pill-shaped, two-button toggle.
 */
export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale();

  function switchTo(lang: string) {
    if (lang === current) return;
    // Strip current locale prefix if present
    const stripped = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
    const next = lang === "fr" ? stripped : `/en${stripped === "/" ? "" : stripped}`;
    router.push(next);
  }

  return (
    <div
      role="group"
      aria-label="Langue / Language"
      className="inline-flex overflow-hidden rounded-full border border-olive-600/15 bg-white/70 backdrop-blur-sm"
    >
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => switchTo(lang)}
          aria-pressed={current === lang}
          className={`px-3 py-1.5 text-xs uppercase tracking-wider transition ${
            current === lang ? "bg-olive-600 text-cream-50" : "text-ink-muted hover:text-olive-700"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
