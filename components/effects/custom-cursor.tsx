"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom cursor that:
 * - hides the OS cursor on desktop
 * - tracks pointer with a tight inner dot and a soft trailing ring
 * - morphs label & shape on hover targets:
 *     [data-cursor="rdv"]   → "PRENDRE RDV →"
 *     [data-cursor="link"]  → ring grows
 *     [data-cursor="anatomy"] → "EXPLORER ↓"
 * - blends via mix-blend-mode so it inverts over text
 *
 * Disabled automatically on touch devices and prefers-reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<string>("default");
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Spring for the trailing ring
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const enter = (e: Event) => {
      const el = e.target as HTMLElement;
      const v = el?.closest?.("[data-cursor]") as HTMLElement | null;
      if (!v) return;
      const kind = v.dataset.cursor || "link";
      setVariant(kind);
      const lbl = v.dataset.cursorLabel;
      if (lbl) setLabel(lbl);
      else if (kind === "rdv") setLabel("PRENDRE RDV →");
      else if (kind === "anatomy") setLabel("EXPLORER ↓");
      else setLabel(null);
    };
    const leave = () => {
      setVariant("default");
      setLabel(null);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
      document.documentElement.style.cursor = "";
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = variant === "rdv" ? 140 : variant === "link" ? 64 : 28;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, width: ringSize, height: ringSize }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-olive-700/40 mix-blend-difference flex items-center justify-center"
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[10px] tracking-[0.18em] text-cream-50 whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[101] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive-600 mix-blend-difference"
      />
    </>
  );
}
