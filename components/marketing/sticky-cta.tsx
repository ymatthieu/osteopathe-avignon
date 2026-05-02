"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { SITE } from "@/lib/utils";
import { useTranslations } from "next-intl";

/**
 * Sticky mobile booking CTA — appears after scrolling past hero.
 * Hidden on desktop (md+).
 */
export function StickyCta() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400, 600], [0, 0, 1]);
  const y = useTransform(scrollY, [0, 400, 600], [40, 40, 0]);
  const t = useTranslations("nav");

  return (
    <motion.a
      href={SITE.doctolib.url}
      target="_blank"
      rel="noopener"
      style={{ opacity, y }}
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 rounded-full bg-olive-600 px-6 py-3.5 text-cream-50 font-medium shadow-glow md:hidden"
      aria-label="Prendre rendez-vous sur Doctolib"
    >
      <CalendarCheck className="size-4" />
      {t("book")}
    </motion.a>
  );
}
