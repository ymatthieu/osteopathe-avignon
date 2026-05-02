"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Page-load takeover. First visit only (sessionStorage flag).
 * Massive serif name reveal on dark canvas, then sweeps up to expose the site.
 * Skippable by clicking. Skipped automatically if prefers-reduced-motion.
 */
export function IntroOverlay() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    if (sessionStorage.getItem("osteo-intro-seen") === "1") return;
    setShown(true);
    const t = setTimeout(() => {
      setShown(false);
      sessionStorage.setItem("osteo-intro-seen", "1");
    }, 2900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1] } }}
          onClick={() => {
            setShown(false);
            sessionStorage.setItem("osteo-intro-seen", "1");
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#101113] cursor-pointer"
        >
          <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-cream-50/40">
            CABINET D&apos;OSTÉOPATHIE — AVIGNON
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
              className="font-serif text-[14vw] leading-none text-cream-50"
              style={{ fontVariationSettings: "'opsz' 144, 'wght' 500, 'SOFT' 50" }}
            >
              Yeghiazarian
            </motion.h1>
          </div>
          <div className="overflow-hidden absolute bottom-[35vh]">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.45 }}
              className="font-mono text-xs tracking-[0.3em] text-cream-50/60"
            >
              OSTÉOPATHE • D.O.
            </motion.div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: "linear", delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-cream-50/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
