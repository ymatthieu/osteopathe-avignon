"use client";

import { useTranslations } from "next-intl";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

export function Stats() {
  const t = useTranslations("stats");

  const items = [
    { value: 16, suffix: "+", label: t("experience"), display: null },
    { value: 2, suffix: "", label: t("languages"), display: null },
    { value: 45, suffix: ` ${t("min")}`, label: t("session"), display: null },
    { value: null, suffix: "", label: t("fee"), display: "60 €" },
  ];

  const marquee = "MOUVEMENT — PRÉCISION — PERFORMANCE — MOUVEMENT — PRÉCISION — PERFORMANCE — ";

  return (
    <section className="bg-[#0f1010] text-cream-50 py-32 md:py-44 overflow-hidden">
      <div className="container">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-50/50 mb-16">
          §03 · Le cabinet en chiffres
        </div>
        <div className="grid gap-y-16 md:grid-cols-2 md:gap-x-24">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="grid grid-cols-[auto_1fr] gap-6 items-baseline border-t border-cream-50/15 pt-6">
                <span className="font-serif text-[clamp(4rem,9vw,8rem)] leading-none text-cream-50"
                      style={{ fontVariationSettings: "'opsz' 144, 'wght' 460, 'SOFT' 80" }}>
                  {item.value === null ? item.display : <Counter value={item.value} suffix={item.suffix} />}
                </span>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-50/60 self-end pb-3">
                  {item.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 border-y border-cream-50/15 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-serif italic text-[clamp(2.5rem,5vw,4rem)] mr-12 text-cream-50/90"
                  style={{ fontVariationSettings: "'opsz' 144, 'wght' 380, 'SOFT' 100, 'WONK' 1" }}>
              {marquee}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
