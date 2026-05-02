"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

/**
 * Aceternity-inspired Sparkles.
 * Lightweight version (no canvas) — uses Framer Motion to animate small SVG dots.
 * Used decoratively behind H2 titles or stats.
 */
export function Sparkles({
  className,
  density = 30,
  color = "#cfb589",
}: {
  className?: string;
  density?: number;
  color?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: density }, (_, i) => ({
        id: `s-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.4,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      }))
    );
  }, [density]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
