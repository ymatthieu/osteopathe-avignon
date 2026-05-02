"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

export function About() {
  const t = useTranslations("about");
  const credentials = t.raw("credentials") as string[];

  return (
    <section id="about" className="bg-cream-50 py-32 md:py-40">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#1a1a1f] shadow-soft">
              <Image
                src="/images/matthieu-portrait.jpg"
                alt="Matthieu Yeghiazarian, Ostéopathe D.O."
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-olive-700/80">
                {t("eyebrow")}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl text-olive-800 leading-tight"
                  style={{ fontVariationSettings: "'wght' 460, 'opsz' 144, 'SOFT' 60" }}>
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl font-serif italic leading-snug text-olive-900/85"
                 style={{ fontVariationSettings: "'wght' 400, 'opsz' 96, 'SOFT' 100" }}>
                {t("lead")}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 text-base leading-relaxed text-ink/75">{t("body_1")}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-4 text-base leading-relaxed text-ink/75">{t("body_2")}</p>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <span key={c}
                        className="rounded-full border border-olive-700/15 bg-cream-100 px-4 py-1.5 text-xs text-olive-800">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
