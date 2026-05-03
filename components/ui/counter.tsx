"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Animated number counter. Triggers on mount (with a small delay so the spring
 * has time to wire up) AND when scrolled into view, whichever fires first.
 * Falls back to the static value immediately if the user prefers reduced motion.
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v).toString());
  // Initialise with the final value as a safe fallback so SSR / no-JS / paused
  // animations still show the correct number instead of "0".
  const [shown, setShown] = use