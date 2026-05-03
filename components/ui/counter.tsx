"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Animated number counter. Triggers on mount (with a small 200ms beat so the
 * spring has time to wire up) AND when scrolled into view, whichever fires
 * first. Falls back to the static value immediately if the user prefers
 * reduced motion. Initialises with the target value so SSR / no-JS / paused
 * animations always show the correct number instead of "0".
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v).toString());
  const [shown, setShown] = useState(value.toString());

  useEffect(() => {
    return display.on("change", setShown);
  }, [display]);

  useEffect(() => {
    if (reduce) {
      motionVal.set(value);
      setShown(value.toString());
      return;
    }
    motionVal.set(0);
    setShown("0");
    const t = setTimeout(() => motionVal.set(value), 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  return (
    <motion.span ref={ref} className="font-serif tabular-nums">
      {shown}
      {suffix}
    </motion.span>
  );
}
