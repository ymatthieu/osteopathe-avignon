"use client";

import { useRef, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * A card whose surface tracks the mouse with a soft radial highlight.
 * Aceternity-style "HoverEffect" pattern, tuned to the brand palette.
 */
export function HoverSpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-[2px] border border-ink/10 bg-cream-50/60 backdrop-blur-sm transition",
        "hover:border-olive-600/40",
        className
      )}
    >
      {/* spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(204, 139, 60, 0.18), transparent 60%)",
        }}
      />
      {/* edge ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(90, 107, 58, 0.32), transparent 60%)",
          mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
