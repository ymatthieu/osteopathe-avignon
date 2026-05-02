"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Animated number counter that triggers when scrolled into view.
 * Uses Framer Motion springs for smooth easing.
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v).toString());
  const [shown, setShown] = useState("0");

  useEffect(() => {
    return display.on("change", setShown);
  }, [display]);

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
