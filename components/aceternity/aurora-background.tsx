"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Aceternity-style Aurora Background.
 * A slow-moving conic-gradient mesh that gives the hero a luminous, calm feel.
 * Olive/cream brand variant.
 */
export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
}: {
  className?: string;
  children: ReactNode;
  showRadialGradient?: boolean;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-cream-100 text-ink", className)}>
      <div
        className={cn(
          "pointer-events-none absolute -inset-[10px] opacity-60",
          "[--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)]",
          "[--olive-gradient:repeating-linear-gradient(100deg,#5a6b3a_10%,#87966a_15%,#cfb589_20%,#dfcdab_25%,#5a6b3a_30%)]",
          "[background-image:var(--white-gradient),var(--olive-gradient)]",
          "[background-size:300%_200%]",
          "[background-position:50%_50%,50%_50%]",
          "filter blur-[10px]",
          "after:content-[''] after:absolute after:inset-0",
          "after:[background-image:var(--white-gradient),var(--olive-gradient)]",
          "after:[background-size:200%_100%]",
          "after:animate-aurora after:[background-attachment:fixed]",
          "after:mix-blend-difference",
          showRadialGradient &&
            "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
        )}
      />
      {children}
    </div>
  );
}
