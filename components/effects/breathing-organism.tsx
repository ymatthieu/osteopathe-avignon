"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * BreathingOrganism — full-bleed background that breathes at ~12 BPM
 * and reacts to mouse position with parallax displacement.
 */
export function BreathingOrganism() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const tx1 = useTransform(sx, (v) => `${(v - 0.5) * 24}%`);
  const ty1 = useTransform(sy, (v) => `${(v - 0.5) * 24}%`);
  const tx2 = useTransform(sx, (v) => `${(v - 0.5) * -16}%`);
  const ty2 = useTransform(sy, (v) => `${(v - 0.5) * -16}%`);
  const tx3 = useTransform(sx, (v) => `${(v - 0.5) * 10}%`);
  const ty3 = useTransform(sy, (v) => `${(v - 0.5) * 10}%`);

  useEffect(() => {
    function handle(e: MouseEvent) {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    }
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden>
      {/* base wash */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #f3ede2 0%, #faf6ed 60%, #f0e9d9 100%)" }}
      />
      {/* breathing blob 1 — olive */}
      <motion.div
        style={{
          x: tx1,
          y: ty1,
          background: "radial-gradient(closest-side, #c2cc9a, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[15%] h-[70vw] w-[70vw] rounded-full opacity-60 blur-3xl"
      />
      {/* breathing blob 2 — saffron */}
      <motion.div
        style={{
          x: tx2,
          y: ty2,
          background: "radial-gradient(closest-side, #e8c692, transparent 70%)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -bottom-[25%] -right-[10%] h-[60vw] w-[60vw] rounded-full opacity-55 blur-3xl"
      />
      {/* breathing blob 3 — cream */}
      <motion.div
        style={{
          x: tx3,
          y: ty3,
          background: "radial-gradient(closest-side, #ffffff, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-[20%] right-[20%] h-[40vw] w-[40vw] rounded-full opacity-70 blur-3xl"
      />
      {/* deep moss anchor */}
      <div
        className="absolute -bottom-[10%] left-[35%] h-[35vw] w-[35vw] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #5a6b3a, transparent 70%)" }}
      />
      {/* film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-multiply">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"/>
      </svg>
    </div>
  );
}
