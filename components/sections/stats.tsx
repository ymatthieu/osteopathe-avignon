"use client";

import { useTranslations } from "next-intl";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

/**
 * Editorial-magazine stats. Massive numbers, sparse layout, no "card" feel.
 * Doubles as a marquee strip on the bottom for kinetic energy.
 */
export function Stats() {
  const t = useTranslations("stats");

  const items = [
    { value: 16, suffix: "+", label: t("experience") },
    { value: 2, suffix: "", label: t("languages") },
    { value: 45, suffix: ` ${t("min")}`, label: t("session") },
    { value: null, label: t("fee"), display: "60 €" },
  ] as const;

  const marquee = "MOUVEMENT — PRÉCISION — PERFORMANCE — MOUVEMENT — PRÉCISION — PERFORMANCE — ";

  return (
    <section className="bg-[#0f1010] text-cream-50 py-32 md:py-44 overflow-hidden">
      <div className="container">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-50/50 mb-16">
          §03 · Le cabinet en chiffres
        </div>
        <div className="grid gap-y-16 md:grid-cols-2 md:gap-x-24">
          {items.map((item, i) => (
            <Reveal key={item.label} delay=