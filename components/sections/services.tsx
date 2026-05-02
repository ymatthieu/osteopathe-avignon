"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { Heart, Baby, Users, Globe2, Trophy, Sparkles } from "lucide-react";

const items = [
  { key: "adults", Icon: Heart },
  { key: "sport", Icon: Trophy },
  { key: "pregnancy", Icon: Sparkles },
  { key: "pediatric", Icon: Baby },
  { key: "seniors", Icon: Users },
  { key: "english", Icon: Globe2 },
] as const;

export function Services() {
  const t = useTranslations("services");
  return (
    <section id="services" className="bg-cream-100 py-32 md:py-40">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={Math.min(i * 0.06, 0.25)}>
              <article className="group h-full rounded-md border border-olive-700/10 bg-cream-50 p-8 transition-all hover:border-olive-700/30 hover:shadow-soft">
                <div className="mb-5 inline-flex items-center justify-center size-10 rounded-full bg-olive-100/60 text-olive-700">
                  <Icon className="size-4" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-olive-800 mb-3"
                    style={{ fontVariationSettings: "'wght' 500, 'opsz' 96, 'SOFT' 80" }}>
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-ink/70">
                  {t(`items.${key}.body`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
