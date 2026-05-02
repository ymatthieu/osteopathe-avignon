"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { DoctolibButton } from "@/components/marketing/doctolib-button";

const sections = ["approach", "services", "about", "pricing", "faq", "contact"] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-md bg-cream-100/80"
      style={{ borderBottom: "1px solid", borderColor: useTransform(borderOpacity, (v) => `rgba(43,43,37,${v * 0.12})`) }}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-serif text-xl text-olive-700 leading-none">
          Matthieu Yeghiazarian
          <span className="block text-[10px] uppercase tracking-[0.14em] text-ink-muted font-sans font-normal mt-0.5">
            Ostéopathe D.O. — Avignon
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-ink hover:text-olive-700 transition relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-olive-600 after:transition-all hover:after:w-full"
            >
              {t(s)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="hidden md:block">
            <DoctolibButton variant="primary">{t("book")}</DoctolibButton>
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

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.2, 0.7, 0.3, 1] }}
        className="overflow-hidden md:hidden border-t border-ink/10 bg-cream-100"
      >
        <div className="container py-6 flex flex-col gap-4">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setOpen(false)}
              className="text-lg font-serif text-olive-700"
            >
              {t(s)}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
