"use client";

import { useTranslations } from "next-intl";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

export function Stats() {
  const t = useTranslations("stats");
  const items = [
    { value: 16, suffix: "+", label: t("experience"), display: null as string | null },
    { value: 2, suffix: "", label: t("languages"), display: null },
    { value: 45, suffix: ` ${t("min")}`, label: t("session"), display: null },
    { value: null as number | null, suffix: "", label: t("fee"), display: "60 €" },
  ];

  return (
    <section className="bg-cream-200/50 py-24">
      <div className="container max-w-5xl">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 text-center">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div>
                <div className="font-serif text-5xl text-olive-700"
                     style={{ fontVariationSettings: "'wght' 480, 'opsz' 144, 'SOFT' 80" }}>
                  {item.value === null
                    ? item.display
                    : <Counter value={item.value} suffix={item.suffix} />}
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
                  {item.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
