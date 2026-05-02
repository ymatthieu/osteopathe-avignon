"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { Star } from "lucide-react";

/**
 * Honest placeholder section.
 * No fake reviews — illegal in France for medical practices (DGCCRF, Code de la consommation L121-2).
 * Once real Google reviews are collected, swap in an official Google Reviews widget
 * (e.g. Elfsight, EmbedSocial) that pulls from the live Google Business Profile.
 */
export function Testimonials() {
  const t = useTranslations("testimonials");

  const cards = [
    { key: "a", title: t("placeholder_title"), body: t("placeholder_body") },
    { key: "b", title: t("placeholder_title"), body: t("placeholder_body") },
    { key: "c", title: t("placeholder_title"), body: t("placeholder_body") },
  ];

  return (
    <section className="bg-cream-100 py-28 md:py-36">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08}>
              <div className="rounded-2xl border border-dashed border-olive-700/20 bg-cream-50/50 p-8 text-center">
                <Star className="mx-auto size-8 text-olive-600/30" strokeWidth={1.2} />
                <h3 className="mt-4 font-serif text-lg text-olive-700">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 text-center">
            <a
              href="https://business.google.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-olive-600/20 bg-cream-50 px-6 py-2.5 text-sm text-olive-700 hover:bg-cream-100 transition"
            >
              {t("cta")} →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
