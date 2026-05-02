"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Aceternity Background Beams.
 * Subtle SVG beams that animate across a dark section background.
 * Used behind the testimonials/contact sections for depth.
 */
export function BackgroundBeams({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const beams = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {beams.map((i) => {
          const x1 = (size.w / beams.length) * i + 60;
          const x2 = x1 + 40;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={-20}
              x2={x2}
              y2={size.h + 20}
              stroke="url(#beam-grad)"
              strokeWidth={1.2}
              strokeOpacity={0.45}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          );
        })}
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cfb589" stopOpacity="0" />
            <stop offset="50%" stopColor="#cfb589" stopOpacity="1" />
            <stop offset="100%" stopColor="#cfb589" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
