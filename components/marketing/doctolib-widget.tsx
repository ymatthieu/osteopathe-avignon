"use client";

import Script from "next/script";
import { SITE } from "@/lib/utils";
import { useEffect } from "react";

/**
 * Doctolib official embeddable booking widget.
 * Shows live availability inline. Lazy-loaded.
 * Doc: https://www.doctolib.fr/agenda/external-widget
 */
export function DoctolibWidget() {
  useEffect(() => {
    // Re-init if user navigates back/forward
    const w = window as unknown as { initDoctolib?: () => void };
    if (typeof w.initDoctolib === "function") w.initDoctolib();
  }, []);

  return (
    <div className="w-full">
      <div
        data-doctolib-widget
        data-praticien-url={SITE.doctolib.url}
        className="rounded-2xl border border-olive-600/15 bg-white shadow-soft overflow-hidden min-h-[420px]"
      />
      <Script
        src="https://www.doctolib.fr/external_widget.js"
        strategy="lazyOnload"
        async
      />
    </div>
  );
}
