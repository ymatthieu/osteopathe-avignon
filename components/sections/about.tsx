"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

export function About() {
  const t = useTranslations("about");
  const credentials = t.raw("credentials") as string[];

  return (
    <section id="about" className="bg-cream-50 py-28 md:py-36">
      <div className="container">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20 items-center">
          {/* Portrait */}
          <Reveal>
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1f] to-[#2c2c33] shadow-glow">
              {/* TODO: replace with <Image src="/images/matthieu-portrait.jpg" alt="..." fill className="object-cover" priority /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-50/40 text-center p-8">
                <div className="font-serif text-5xl">⌬</div>
                <div className="mt-4 text-xs uppercase tracking-[0.18em]">
                  Portrait de Matthieu
                </div>
                <div className="mt-2 text-[11px] opacity-70">
                  drop /public/images/matthieu-portrait.jpg
                </div>
              </div>
              {/* Subtle radial accent */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 60%)" }}
              />
            </div>
          </Reveal>

          {/* Content */}
          <div>
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
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-ink leading-relaxed">{t("lead")}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-ink-muted leading-relaxed">{t("body_1")}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-4 text-ink-muted leading-relaxed">{t("body_2")}</p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-8 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-olive-600/15 bg-cream-100 px-4 py-1.5 text-xs font-medium text-olive-700"
                  >
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
