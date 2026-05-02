"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

/**
 * Aceternity Hover Border Gradient.
 * Animated rotating-gradient border around a button or anchor.
 * Used for the primary "Prendre RDV" CTA.
 */
type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

type CommonProps = {
  children: ReactNode;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

export function HoverBorderGradient(props: AsButton | AsAnchor) {
  const {
    children,
    containerClassName,
    className,
    duration = 1,
    clockwise = true,
    as = "button",
    ...rest
  } = props as CommonProps & { as?: "button" | "a" } & Record<string, unknown>;

  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (d: Direction): Direction => {
    const order: Direction[] = clockwise
      ? ["TOP", "LEFT", "BOTTOM", "RIGHT"]
      : ["TOP", "RIGHT", "BOTTOM", "LEFT"];
    return order[(order.indexOf(d) + 1) % order.length];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(80, 30%, 35%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(80, 30%, 35%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(80, 30%, 35%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, hsl(80, 30%, 35%) 0%, rgba(255, 255, 255, 0) 100%)",
  };
  const highlight =
    "radial-gradient(75% 181.16% at 50% 50%, hsl(80, 35%, 50%) 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setDirection((d) => rotateDirection(d)), duration * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, duration, clockwise]);

  const inner = (
    <>
      <div
        className={cn(
          "relative z-10 rounded-full bg-olive-600 text-cream-50",
          "px-7 py-3.5 font-medium text-base",
          "shadow-soft inline-flex items-center justify-center",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-full"
        style={{ filter: "blur(2px)", position: "absolute", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
    </>
  );

  const containerClass = cn(
    "relative inline-flex items-center justify-center overflow-visible p-px",
    "rounded-full transition duration-500",
    containerClassName
  );

  if (as === "a") {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={containerClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={containerClass}
    >
      {inner}
    </button>
  );
}
