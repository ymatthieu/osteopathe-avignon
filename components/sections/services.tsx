"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { HoverSpotlightCard } from "@/components/effects/hover-spotlight-card";
import { Heart, Baby, Users, Globe2, Trophy } from "lucide-react";

const items = [
  { key: "adults", n: "01", Icon: Heart },
  { key: "sport", n: "02", Icon: Trophy },
  { key: "pregnancy", n: "03", Icon: Heart },
  { key: "pediatric", n: "04", Icon: Baby },
  { key: "seniors", n: "05", Icon: Users },
  { key: "english", n: "06", Icon: Globe2 },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative bg-cream-100 py-32 md:py-44">
      <div className="container">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 mb-20 items-end">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-olive-700 mb-6">
              §02 · {t("eyebrow")}
            </div>
            <h2 className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-olive-800"
                style={{ fontVariationSettings: "'opsz' 144, 'wght' 460, 'SOFT' 60, 'WONK' 1" }}>
              {t("title")}
            </h2>
          </div>
          <div className="font-mono text-sm text-ink/70 leading-relaxed max-w-md justify-self-end">
            Une approche manuelle, pensée séance après séance — jamais protocolaire. Six profils, une seule attention&nbsp;: la vôtre.
          </div>
        </div>

        <div className="grid gap-px bg-ink/10 border-y border-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, n, Icon }, i) => (
            <Reveal key={key} delay={Math.min(i * 0.05, 0.25)}>
              <HoverSpotlightCard className="h-full">
                <div data-cursor="link" className="flex h-full flex-col p-10 md:p-12 min-h-[320px] bg-cream-100">
                  <div className="flex items-start justify-between mb-10">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-olive-700/70">
                      {n}
                    </span>
                    <Icon className="size-5 text-olive-700/50" strokeWidth={1.2} />
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-olive-800 leading-tight"
                      style={{ fontVariationSettings: "'opsz' 96, 'wght' 480, 'SOFT' 80" }}>
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-ink/75">
                    {t(`items.${key}.body`)}
                  </p>
                  <div className="mt-auto pt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-mono text-olive-700">
                    <span>Voir séance</span>
                    <span className="block h-px w-8 bg-olive-700/40 group-hover:w-16 transition-all"/>
                  </div>
                </div>
              </HoverSpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
