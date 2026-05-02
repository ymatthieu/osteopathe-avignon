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
import { CustomCursor } from "@/components/effects/custom-cursor";
import { IntroOverlay } from "@/components/effects/intro-overlay";

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
        fr: SITE.url,
        "fr-FR": SITE.url,
        en: `${SITE.url}/en`,
        "en-GB": `${SITE.url}/en`,
        "en-US": `${SITE.url}/en`,
        "x-default": SITE.url,
      },
    },
    openGraph: {
      type: "website",
      locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
      url,
      siteName: SITE.name,
      title: t("title"),
      description: t("description"),
      images: [{ url: "/images/og.svg", width: 1200, height: 630, alt: SITE.shortName }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og.svg"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    other: {
      "ai-content-summary": "/llms.txt",
      "ai-content-markdown": "/page.md",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
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
    name: SITE.name,
    alternateName: ["Matthieu Yeghiazarian Ostéopathe", "Osteopath Avignon Yeghiazarian"],
    description: tMeta("description"),
    url: SITE.url,
    image: [`${SITE.url}/images/og.svg`],
    email: SITE.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: "Vaucluse",
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.latitude,
      longitude: SITE.address.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.address.street} ${SITE.address.postalCode} ${SITE.address.city}`)}`,
    openingHoursSpecification: SITE.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: [
      { "@type": "City", name: "Avignon" },
      { "@type": "Place", name: "Le Pontet" },
      { "@type": "Place", name: "Villeneuve-lès-Avignon" },
      { "@type": "Place", name: "Sorgues" },
      { "@type": "Place", name: "Morières-lès-Avignon" },
    ],
    availableLanguage: [
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    medicalSpecialty: "Osteopathic",
    knowsAbout: [
      "Ostéopathie structurelle",
      "Ostéopathie crânienne",
      "Ostéopathie viscérale",
      "Ostéopathie pédiatrique",
      "Ostéopathie du sport",
      "Ostéopathie de la femme enceinte",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      name: isFr ? "Prendre rendez-vous" : "Book appointment",
      target: {
        "@type": "EntryPoint",
        urlTemplate: SITE.doctolib.url,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
    sameAs: [SITE.doctolib.url],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: "Matthieu Yeghiazarian",
    givenName: "Matthieu",
    familyName: "Yeghiazarian",
    honorificSuffix: "D.O.",
    jobTitle: isFr ? "Ostéopathe D.O." : "Osteopath D.O.",
    image: `${SITE.url}/images/matthieu-portrait.jpg`,
    url: `${SITE.url}/about`,
    email: SITE.email,
    worksFor: { "@id": `${SITE.url}/#localbusiness` },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Collège d'Ostéopathie de Provence",
      address: { "@type": "PostalAddress", addressLocality: "Aix-en-Provence", addressCountry: "FR" },
    },
    knowsLanguage: [
      { "@type": "Language", name: "French" },
      { "@type": "Language", name: "English" },
    ],
    sameAs: [SITE.doctolib.url],
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <a className="skip-link" href="#main">Passer au contenu principal</a>
      <IntroOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <StickyCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
     