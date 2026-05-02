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
    <section id="approach" className="bg-cream-100 py-32 md:py-40">
      <div className="container max-w-6xl">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-olive-700/80">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-olive-800 leading-tight"
                style={{ fontVariationSettings: "'wght' 460, 'opsz' 144, 'SOFT' 60" }}>
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-16 md:grid-cols-3 md:gap-12">
          {items.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 0.1}>
              <div className="text-center px-4">
                <div className="mx-auto mb-6 inline-flex items-center justify-center size-12 rounded-full bg-olive-100/60 text-olive-700">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-olive-800 mb-4"
                    style={{ fontVariationSettings: "'wght' 500, 'opsz' 96, 'SOFT' 80" }}>
                  {t(`${key}.title`)}
                </h3>
                <p className="text-ink/70 leading-relaxed">{t(`${key}.body`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
