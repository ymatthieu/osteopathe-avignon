"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Link from "next/link";
import { BreathingOrganism } from "@/components/effects/breathing-organism";
import { Magnetic } from "@/components/effects/magnetic";
import { SITE } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Title weight/opsz drift as user scrolls
  const wght = useTransform(scrollYProgress, [0, 1], [580, 320]);
  const opsz = useTransform(scrollYProgress, [0, 1], [144, 80]);
  const soft = useTransform(scrollYProgress, [0, 1], [40, 100]);
  const fvs = useTransform([wght, opsz, soft], ([w, o, s]) =>
    `'wght' ${w}, 'opsz' ${o}, 'SOFT' ${s}`
  );
  // Subtle parallax push of the tagline
  const tagY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden flex items-end pb-24 md:pb-40"
    >
      <BreathingOrganism />

      {/* Top frame — editorial chrome */}
      <div className="absolute inset-x-0 top-24 px-6 md:px-12 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
        <div>
          <div>N° 01 — 2026</div>
          <div className="mt-1 opacity-60">Cabinet privé · Avignon</div>
        </div>
        <div className="text-right">
          <div>43°56′N • 4°48′E</div>
          <div className="mt-1 opacity-60">38, rue Saint-Ruf</div>
        </div>
      </div>

      {/* Massive type — the centerpiece */}
      <div className="container relative z-10">
        <div className="max-w-[1400px]">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="block font-mono text-[10px] uppercase tracking-[0.3em] text-olive-700/80 mb-8"
          >
            {t("eyebrow")}
          </motion.span>

          {/* Two-line display title with variable-font drift */}
          <div className="overflow-hidden">
            <motion.h1
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
              style={{ fontVariationSettings: fvs }}
              className="font-serif text-[clamp(3.2rem,11vw,12rem)] leading-[0.92] tracking-[-0.02em] text-olive-800"
            >
              Matthieu
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.34 }}
              style={{ fontVariationSettings: fvs }}
              className="font-serif italic text-[clamp(3.2rem,11vw,12rem)] leading-[0.92] tracking-[-0.02em] text-olive-700/95"
            >
              Yeghiazarian.
            </motion.h1>
          </div>

          {/* Right-floated subtitle + CTA */}
          <motion.div
            style={{ y: tagY }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
          >
            <p className="max-w-xl text-base md:text-lg text-ink/85 leading-relaxed font-mono">
              <span className="text-olive-700">↳</span>&nbsp;{t("tagline_1")}, {t("tagline_2").toLowerCase()},{" "}
              {t("tagline_3").toLowerCase()}.
              <span className="block mt-3 opacity-60 text-sm">
                Ostéopathe D.O. — Cabinet au cœur d&apos;Avignon. 16 ans d&apos;expérience. FR / EN.
              </span>
            </p>

    