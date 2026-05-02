"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { Activity, Crosshair, TrendingUp } from "lucide-react";

const items = [
  { key: "movement", Icon: Activity },
  { key: "precision", Icon: Crosshair },
  { key: "performance", Icon: TrendingUp },
] as const;

export function Principles() {
  const t = useTranslations("principles");
  return (
    <section id="approach" className="bg-cream-50 py-28 md:py-36">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
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

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {items.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 0.12} className="text-center px-4">
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-olive-100/60 text-olive-700">
                <Icon className="size-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-olive-700 mb-3">{t(`${key}.title`)}</h3>
              <p className="text-ink-muted leading-relaxed">{t(`${key}.body`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
