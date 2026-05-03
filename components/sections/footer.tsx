"use client";

import { useTranslations, useLocale } from "next-intl";
import { SITE } from "@/lib/utils";
import Link from "next/link";

const sections = ["approach", "services", "about", "pricing", "faq"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const prefix = locale === "fr" ? "" : `/${locale}`;

  return (
    <footer className="bg-olive-700 text-cream-50/85 pt-16 pb-7">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] mb-10">
          <div>
            <div className="font-serif text-xl text-cream-50 leading-none">
              Matthieu Yeghiazarian
              <span className="block text-[10px] uppercase tracking-[0.14em] text-cream-50/70 font-sans font-normal mt-1">
                Ostéopathe D.O. — Avignon
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-cream-50/65 leading-relaxed">{t("intro")}</p>
          </div>

          <div>
            <h4 className="text-cream-50 text-xs uppercase tracking-[0.14em] mb-4">{t("nav")}</h4>
            <ul className="space-y-2.5 text-sm">
              {sections.map((s) => (
                <li key={s}>
                  <a href={`${prefix}/#${s}`} className="text-cream-50/75 hover:text-cream-50 transition">
                    {tn(s)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream-50 text-xs uppercase tracking-[0.14em] mb-4">Cabinet</h4>
            <ul className="space-y-2.5 text-sm text-cream-50/75">
              <li>{SITE.address.street}</li>
              <li>{SITE.address.postalCode} {SITE.address.city}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-cream-50">{SITE.email}</a>
              </li>
              <li>
                <a href={SITE.doctolib.url} target="_blank" rel="noopener" className="hover:text-cream-50">
                  Doctolib
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-50 text-xs uppercase tracking-[0.14em] mb-4">{t("legal")}</h4>
            <ul className="space-y-2.5 text-sm text-cream-50/75">
              <li>
                <Link href={`${prefix}/mentions-legales`} className="hover:text-cream-50">
                  {t("mentions")}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/privacy`} className="hover:text-cream-50">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/accessibility`} className="hover:text-cream-50">
                  {t("accessibility")}
                </Link>
              </li>
              <li>
                <a href={locale === "en" ? "/llms-en.txt" : "/llms.txt"} className="hover:text-cream-50">
                  llms.txt
                </a>
              </li>
              <li>
                <a href={locale === "en" ? "/page-en.md" : "/page.md"} className="hover:text-cream-50">
                  page.md
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-50/10 pt-7 text-center text-xs text-cream-50/55">
          © {year} Matthieu Yeghiazarian, Ostéopathe D.O. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
