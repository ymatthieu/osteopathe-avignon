"use client";

import { useEffect, useState } from "react";

/**
 * Number display with a smooth count-up animation on mount.
 * Uses a plain requestAnimationFrame loop — no Framer Motion spring chain
 * (the previous implementation got stuck at 0 in production builds because
 * the MotionValue → useSpring → useTransform → setShown chain occasionally
 * failed to fire). Initial state is the target value so SSR and no-JS users
 * see the correct number; client effect resets to 0 then animates up.
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    let raf = 0;
    setShown(0);
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className="font-serif tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}
