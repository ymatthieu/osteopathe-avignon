"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { SITE } from "@/lib/utils";

const sections = ["approach", "services", "about", "pricing", "faq", "contact"] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div style={{ opacity }} className="absolute inset-0 backdrop-blur-md bg-cream-50/80 border-b border-olive-700/10" />
      <div className="relative container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-serif text-base text-olive-800 leading-none"
              style={{ fontVariationSettings: "'wght' 540, 'opsz' 96, 'SOFT' 80" }}>
          Matthieu Yeghiazarian
          <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 font-normal mt-0.5">
            Ostéopathe D.O. — Avignon
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
          {sections.map((s) => (
            <a key={s} href={`#${s}`} className="text-ink/70 hover:text-olive-800 transition">{t(s)}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a href={SITE.doctolib.url} target="_blank" rel="noopener"
             className="hidden md:inline-flex items-center rounded-full bg-olive-700 text-cream-50 px-5 py-2 text-sm hover:bg-olive-800 transition">
            {t("book")}
          </a>
          <button onClick={() => setOpen(v => !v)} aria-label={t("menu")} aria-expanded={open}
                  className="md:hidden p-2 -mr-2">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <motion.div initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.32 }}
                  className="overflow-hidden md:hidden border-t border-olive-700/10 bg-cream-50">
        <div className="container py-6 flex flex-col gap-4">
          {sections.map((s) => (
            <a key={s} href={`#${s}`} onClick={() => setOpen(false)}
               className="text-xl font-serif text-olive-800"
               style={{ fontVariationSettings: "'wght' 460, 'opsz' 96, 'SOFT' 80" }}>
              {t(s)}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
