"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Spotlight } from "@/components/aceternity/spotlight";
import { TextGenerateEffect } from "@/components/aceternity/text-generate";
import { Sparkles } from "@/components/aceternity/sparkles";
import { DoctolibButton } from "@/components/marketing/doctolib-button";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-cream-100 flex items-center">
      {/* Aceternity spotlight */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#cfb589" />

      {/* Soft radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(800px 500px at 75% 30%, rgba(135, 150, 106, 0.18), transparent 60%),
            radial-gradient(600px 400px at 20% 80%, rgba(212, 200, 180, 0.35), transparent 70%),
            linear-gradient(180deg, #f1ece4 0%, #fbf8f3 100%)
          `,
        }}
      />

      {/* Anatomical skeleton silhouette - subtle background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 opacity-[0.06]">
        <svg viewBox="0 0 200 200" className="w-[600px] h-[600px] text-olive-700" fill="none" aria-hidden>
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="100" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <Sparkles density={20} color="#cfb589" />

      <div className="container relative z-10 text-center py-32">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-5 text-xs uppercase tracking-[0.18em] text-olive-700 font-medium"
        >
          {t("eyebrow")}
        </motion.span>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-olive-700 tracking-tight">
          <TextGenerateEffect words={t("title_line_1")} className="block" />
          <TextGenerateEffect words={t("title_line_2")} className="block" duration={0.6} />
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 mb-12 italic font-serif text-xl md:text-2xl text-ink-muted"
        >
          <span>{t("tagline_1")}</span>
          <span className="mx-3 text-olive-600">•</span>
          <span>{t("tagline_2")}</span>
          <span className="mx-3 text-olive-600">•</span>
          <span>{t("tagline_3")}</span>
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <DoctolibButton variant="primary">{t("cta_primary")}</DoctolibButton>
          <a
            href="#approach"
            className="inline-flex items-center gap-2 rounded-full border border-olive-600/20 bg-cream-50/80 px-7 py-3.5 font-medium text-base text-olive-700 backdrop-blur-sm transition hover:border-olive-600 hover:bg-cream-100"
          >
            {t("cta_secondary")}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.16em] text-ink-muted"
        >
          {t("scroll_hint")} ↓
        </motion.span>
      </div>
    </section>
  );
}
