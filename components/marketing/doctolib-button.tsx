"use client";

import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";
import { SITE } from "@/lib/utils";
import { CalendarCheck } from "lucide-react";
import { ReactNode } from "react";

/**
 * Primary booking CTA — opens Doctolib in a new tab.
 * Tracks the click for analytics if window.gtag is present.
 */
export function DoctolibButton({
  children,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  function track() {
    if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag("event", "doctolib_click", {
        event_category: "engagement",
        event_label: window.location.pathname,
      });
    }
  }

  if (variant === "ghost") {
    return (
      <a
        href={SITE.doctolib.url}
        target="_blank"
        rel="noopener"
        onClick={track}
        className={`inline-flex items-center gap-2 rounded-full border border-olive-600/20 bg-cream-50/80 px-7 py-3.5 font-medium text-base text-olive-700 backdrop-blur-sm transition hover:border-olive-600 hover:bg-cream-100 ${className ?? ""}`}
      >
        <CalendarCheck className="size-4" />
        {children}
      </a>
    );
  }

  return (
    <HoverBorderGradient
      as="a"
      href={SITE.doctolib.url}
      target="_blank"
      rel="noopener"
      onClick={track}
      className={`flex items-center gap-2 ${className ?? ""}`}
    >
      <CalendarCheck className="size-4" />
      {children}
    </HoverBorderGradient>
  );
}
