"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/card-3d";
import { Heart, Activity, Baby, Users, Globe2, Trophy } from "lucide-react";

const items = [
  { key: "adults", Icon: Heart },
  { key: "sport", Icon: Trophy },
  { key: "pregnancy", Icon: Heart },
  { key: "pediatric", Icon: Baby },
  { key: "seniors", Icon: Users },
  { key: "english", Icon: Globe2 },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="bg-cream-100 py-28 md:py-36">
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
          {items.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 0.06}>
              <CardContainer containerClassName="py-0">
                <CardBody className="group relative h-full w-full rounded-2xl border border-olive-700/10 bg-white p-8 shadow-soft transition-all hover:shadow-glow hover:border-olive-600/30">
                  <CardItem translateZ={40}>
                    <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-olive-100/60 text-olive-700">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                  </CardItem>
                  <CardItem
                    as="h3"
                    translateZ={30}
                    className="font-serif text-2xl text-olive-700 mb-2"
                  >
                    {t(`items.${key}.title`)}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ={20}
                    className="text-ink-muted text-sm leading-relaxed"
                  >
                    {t(`items.${key}.body`)}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
