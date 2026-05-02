"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

export function Pricing() {
  const t = useTranslations("pricing");

  const rows = [
    { key: "adult", duration: "~45 min", price: "60 €" },
    { key: "athlete", duration: "~45 min", price: "60 €" },
    { key: "pregnancy", duration: "~45 min", price: "60 €" },
    { key: "pediatric", duration: "~30–45 min", price: "60 €" },
  ] as const;

  return (
    <section id="pricing" className="bg-cream-200 py-28 md:py-36">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.18em] text-olive-700 font-medium">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-olive-700 tracking-tight">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-soft">
            <div className="grid grid-cols-[2fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr] bg-olive-700 px-8 py-4 text-cream-50">
              <div className="text-xs uppercase tracking-[0.12em] font-medium">{t("consultation")}</div>
              <div className="text-xs uppercase tracking-[0.12em] font-medium text-center hidden sm:block">{t("duration")}</div>
              <div className="text-xs uppercase tracking-[0.12em] font-medium text-right">{t("fee")}</div>
            </div>
            {rows.map((r) => (
              <div
                key={r.key}
                className="grid grid-cols-[2fr_1fr_1fr] items-center px-8 py-5 border-b border-ink/10 last:border-b-0"
              >
                <div className="text-ink">{t(`items.${r.key}`)}</div>
                <div className="text-ink-muted text-sm text-center hidden sm:block">{r.duration}</div>
                <div className="font-serif text-2xl text-olive-600 text-right">{r.price}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 mx-auto max-w-2xl text-center text-sm text-ink-muted leading-relaxed">
            {t("note")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
