"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { DoctolibButton } from "@/components/marketing/doctolib-button";
import { DoctolibWidget } from "@/components/marketing/doctolib-widget";
import { SITE } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="bg-cream-200 py-28 md:py-36">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.18em] text-olive-700 font-medium">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-olive-700 tracking-tight">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Info column */}
          <Reveal>
            <div className="space-y-8">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-olive-700 mb-2">
                  {t("address")}
                </div>
                <div className="font-serif text-xl text-olive-700">
                  {SITE.address.street}<br />
                  {SITE.address.postalCode} {SITE.address.city}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-olive-700 mb-2">
                  {t("email")}
                </div>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-serif text-xl text-olive-700 hover:underline underline-offset-4"
                >
                  {SITE.email}
                </a>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-olive-700 mb-3">
                  {t("hours")}
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-ink/10">
                      <td className="py-2 text-ink-muted">{t("mon_fri")}</td>
                      <td className="py-2 text-right font-medium text-olive-700">9h – 13h / 14h – 19h</td>
                    </tr>
                    <tr className="border-b border-ink/10">
                      <td className="py-2 text-ink-muted">{t("sat")}</td>
                      <td className="py-2 text-right font-medium text-olive-700">9h – 12h</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-ink-muted">{t("sun")}</td>
                      <td className="py-2 text-right text-ink-muted">{t("closed")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-4">
                <DoctolibButton variant="primary">{t("cta")}</DoctolibButton>
              </div>
            </div>
          </Reveal>

          {/* Map + Doctolib widget column */}
          <Reveal delay={0.15}>
            <div className="space-y-6">
              {/* Embedded map */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-olive-600/15 shadow-soft bg-cream-100">
                <iframe
                  title="Plan d'accès — Cabinet Yeghiazarian"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`)}&output=embed`}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`)}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm text-olive-700 hover:underline underline-offset-4"
              >
                <MapPin className="size-4" />
                Ouvrir dans Google Maps
              </a>
            </div>
          </Reveal>
        </div>

        {/* Doctolib live widget — full width below */}
        <Reveal delay={0.3}>
          <div className="mt-20 mx-auto max-w-4xl">
            <h3 className="text-center font-serif text-2xl text-olive-700 mb-6">
              Réserver en direct
            </h3>
            <DoctolibWidget />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
