"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Reading progress bar at top of viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-gradient-to-r from-olive-600 via-olive-500 to-olive-700"
    />
  );
}
