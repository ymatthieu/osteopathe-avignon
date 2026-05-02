"use client";

import { useTranslations } from "next-intl";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

export function Stats() {
  const t = useTranslations("stats");

  const items = [
    { value: 16, suffix: "+", label: t("experience") },
    { value: 2, suffix: "", label: t("languages") },
    { value: 45, suffix: ` ${t("min")}`, label: t("session") },
    { value: null, label: t("fee") }, // 60 €
  ] as const;

  return (
    <section className="bg-cream-200 py-20">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="font-serif text-5xl md:text-6xl text-olive-600 leading-none">
                {item.value === null ? "60 €" : <Counter value={item.value} suffix={item.suffix} />}
              </div>
              <div className="mt-2 text-xs tracking-[0.15em] uppercase text-ink-muted">
                {item.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
