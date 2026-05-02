import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/utils";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress } from "@/components/marketing/scroll-progress";
import { StickyCta } from "@/components/marketing/sticky-cta";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isFr = locale === "fr";
  const url = `${SITE.url}${isFr ? "" : "/en"}`;
  return {
    title: { default: t("title"), template: `%s | ${SITE.shortName}` },
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        fr: SITE.url, "fr-FR": SITE.url,
        en: `${SITE.url}/en`, "en-GB": `${SITE.url}/en`, "en-US": `${SITE.url}/en`,
        "x-default": SITE.url,
      },
    },
    openGraph: {
      type: "website", locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
      url, siteName: SITE.name, title: t("title"), description: t("description"),
      images: [{ url: "/images/og.svg", width: 1200, height: 630, alt: SITE.shortName }],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: ["/images/og.svg"] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export default async function LocaleLayout({
  children, params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const isFr = locale === "fr";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name, description: tMeta("description"),
    url: SITE.url, image: [`${SITE.url}/images/og.svg`],
    email: SITE.email, priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street, addressLocality: SITE.address.city,
      addressRegion: "Vaucluse", postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.address.latitude, longitude: SITE.address.longitude },
    openingHoursSpecification: SITE.hours.map((h) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: h.day, opens: h.opens, closes: h.closes,
    })),
    availableLanguage: [
      { "@type": "Language", name: "French" },
      { "@type": "Language", name: "English" },
    ],
    medicalSpecialty: "Osteopathic",
    potentialAction: {
      "@type": "ReserveAction",
      name: isFr ? "Prendre rendez-vous" : "Book appointment",
      target: SITE.doctolib.url,
    },
    sameAs: [SITE.doctolib.url],
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <a className="skip-link" href="#main">Passer au contenu principal</a>
      <ScrollProgress />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <StickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </NextIntlClientProvider>
  );
}
