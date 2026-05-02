"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Massive variable-font display title.
 * Uses Fraunces variable axes (opsz, wght, SOFT, WONK) and morphs them as the
 * user scrolls past the title. Each letter set up so it can be split if needed.
 */
export function VariableTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const wght = useTransform(scrollYProgress, [0, 0.5, 1], [600, 380, 700]);
  const opsz = useTransform(scrollYProgress, [0, 0.5, 1], [144, 96, 144]);
  const soft = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 50]);
  const wonk = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const fontVariationSettings = useTransform(
    [wght, opsz, soft, wonk],
    ([w, o, s, k]) =>
      `'wght' ${w}, 'opsz' ${o}, 'SOFT' ${s}, 'WONK' ${k}`
  );

  return (
    <motion.div
      ref={ref}
      style={{ fontVariationSettings }}
      className={cn("font-serif", className)}
    >
      {children}
    </motion.div>
  );
}
