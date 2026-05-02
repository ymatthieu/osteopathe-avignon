"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  const t = useTranslations("about");
  const credentials = t.raw("credentials") as string[];

  return (
    <section id="about" className="relative bg-[#faf6ed] py-32 md:py-44 overflow-hidden">
      <div className="container">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-olive-700 mb-12">
          §05 · {t("eyebrow")}
        </div>
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Portrait — taller and editorial */}
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#1a1a1f] to-[#2c2c33] rounded-[2px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-50/40 text-center p-8">
                <div className="font-serif text-6xl"
                     style={{ fontVariationSettings: "'opsz' 144, 'wght' 480, 'SOFT' 100" }}>
                  MY
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em]">Portrait</div>
                <div className="mt-1 font-mono text-[9px] opacity-70">drop matthieu-portrait.jpg</div>
              </div>
              <div aria-hidden className="absolute inset-0"
                   style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 60%)" }}/>
              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-cream-50/60">
                <span>Cabinet · Avignon</span>
                <span>2026</span>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div className="md:col-span-7 md:pt-8">
            <Reveal delay={0.1}>
              <h2 className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-olive-800"
                  style={{ fontVariationSettings: "'opsz' 144, 'wght' 460, 'SOFT' 60" }}>
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-2xl md:text-3xl font-serif italic leading-snug text-olive-900/90"
                 style={{ fontVariationSettings: "'opsz' 96, 'wght' 380, 'SOFT' 100" }}>
                {t("lead")}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-ink/80 max-w-2xl">
                {t("body_1")}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-ink/80 max-w-2xl">
                {t("body_2")}
              </p>
            </Reveal>
