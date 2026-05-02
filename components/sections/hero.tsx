"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SITE } from "@/lib/utils";
import { CalendarCheck, ArrowDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-cream-50">
      {/* very soft single radial wash — no blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 700px at 60% 35%, rgba(151,167,106,0.08), transparent 70%)," +
            "linear-gradient(180deg, #fdfbf7 0%, #fbf8f3 100%)",
        }}
      />

      <div className="container max-w-4xl text-center px-6 py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-olive-700/80 mb-8">
            Cabinet d&apos;ostéopathie · Avignon
          </span>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-serif text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.015em] text-olive-800"
          style={{ fontVariationSettings: "'wght' 460, 'opsz' 144, 'SOFT' 50" }}
        >
          Matthieu Yeghiazarian,
          <br />
          <span className="italic text-olive-700"
                style={{ fontVariationSettings: "'wght' 380, 'opsz' 144, 'SOFT' 100" }}>
            Ostéopathe D.O.
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 max-w-xl mx-auto text-lg text-ink/70 leading-relaxed"
        >
          Approche manuelle, globale et personnalisée. 16 ans d&apos;expérience.
          Consultations en français et en anglais, sur rendez-vous.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={SITE.doctolib.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 rounded-full bg-olive-700 text-cream-50 px-8 py-4 text-base font-medium shadow-soft hover:bg-olive-800 hover:shadow-glow transition-all"
          >
            <CalendarCheck className="size-4" strokeWidth={1.8} />
            Prendre rendez-vous
          </a>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-4 text-sm text-olive-800 hover:text-olive-900 transition-colors"
          >
            Découvrir le cabinet
          </Link>
        </motion.div>

        {/* Subtle trust strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50"
        >
          <span>16 ans d&apos;expérience</span>
          <span aria-hidden>·</span>
          <span>FR / EN</span>
          <span aria-hidden>·</span>
          <span>60 € · 45 min</span>
          <span aria-hidden>·</span>
          <span>RDV en ligne Doctolib</span>
        </motion.div>
      </div>

      {/* gentle scroll cue */}
      <motion.a
        href="#about"
        aria-label="Faire défiler"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-olive-700/60 hover:text-olive-700 transition"
      >
        <ArrowDown className="size-4" strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}
