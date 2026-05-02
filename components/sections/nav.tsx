"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { Magnetic } from "@/components/effects/magnetic";
import { SITE } from "@/lib/utils";

const sections = ["approach", "services", "about", "pricing", "faq", "contact"] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 backdrop-blur-md bg-cream-100/70 border-b border-ink/10"
      />
      <div className="relative container flex h-16 items-center justify-between gap-4">
        <Link data-cursor="link" href="/" className="font-serif text-lg text-olive-800 leading-none"
              style={{ fontVariationSettings: "'opsz' 96, 'wght' 540, 'SOFT' 80" }}>
          Yeghiazarian
          <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-ink-muted font-normal mt-0.5">
            Ostéopathe D.O. — Avignon
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.18em]">
          {sections.map((s) => (
            <a
              key={s}
              data-cursor="link"
              href={`#${s}`}
              className="text-ink/70 hover:text-olive-800 transition"
            >
              {t(s)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="hidden md:block">
            <Magnetic strength={0.4}>
              <a
                data-cursor="rdv"
                href={SITE.doctolib.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-olive-800 text-cream-50 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] hover:bg-olive-900 transition-colors"
              >
                Réserver
                <span className="block h-1.5 w-1.5 rounded-full bg-saffron-500" />
              </a>
            </Magnetic>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t("menu")}
            aria-expanded={open}
            className="md:hidden p-2 -mr-2"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.2,