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

const PORTRAIT = `${SITE.url}/images/Aragon-Headshot-Matthieu-Yeghiazarian-2026-03-23-61.jpeg`;

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
    keywords: isFr
      ? [
          "ostéopathe Avignon",
          "ostéopathie Avignon",
          "ostéopathe 84000",
          "ostéopathe pédiatrique Avignon",
          "ostéopathe sport Avignon",
          "ostéopathe grossesse Avignon",
          "ostéopathe nourrisson Avignon",
          "ostéopathe Vaucluse",
          "Saint-Ruf Avignon",
          "Matthieu Yeghiazarian",
          "ostéopathe anglais Avignon",
          "RDV ostéopathe Avignon",
        ]
      : [
          "osteopath Avignon",
          "english speaking osteopath Avignon",
          "osteopath France",
          "Matthieu Yeghiazarian",
          "pediatric osteopath Avignon",
          "sports osteopath Avignon",
          "pregnancy osteopath Avignon",
          "osteopathy Provence",
        ],
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
      images: [
        { url: PORTRAIT, width: 1200, height: 1500, alt: SITE.shortName, type: "image/jpeg" },
        { url: "/images/og.svg", width: 1200, height: 630, alt: SITE.shortName, type: "image/svg+xml" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: "Matthieu Yeghiazarian", url: SITE.url }],
    creator: "Matthieu Yeghiazarian",
    publisher: "Cabinet d'Ostéopathie Matthieu Yeghiazarian",
    category: "health",
    other: {
      "geo.region": "FR-84",
      "geo.placename": "Avignon",
      "geo.position": `${SITE.address.latitude};${SITE.address.longitude}`,
      ICBM: `${SITE.address.latitude}, ${SITE.address.longitude}`,
      "DC.title": t("title"),
      "DC.description": t("description"),
      "DC.creator": "Matthieu Yeghiazarian",
      "DC.language": isFr ? "fr-FR" : "en-US",
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
  const pageUrl = `${SITE.url}${isFr ? "" : "/en"}`;
  const personDescription = isFr
    ? "Ostéopathe D.O. à Avignon depuis 16+ ans. Diplômé du Collège d'Ostéopathie de Provence (Aix-Marseille). Approche manuelle, globale et personnalisée. Pédiatrie, sport, grossesse, adultes. Consultations en français et en anglais."
    : "English-speaking osteopath D.O. in Avignon, France. 16+ years of experience. Graduate of Collège d'Ostéopathie de Provence (Aix-Marseille). Whole-body, hands-on, personalized care for adults, athletes, expectant mothers, infants and children.";

  const graph = [
    {
      "@type": ["MedicalBusiness", "LocalBusiness", "ProfessionalService"],
      "@id": `${SITE.url}/#localbusiness`,
      name: SITE.name,
      alternateName: SITE.shortName,
      legalName: "Matthieu Yeghiazarian — Ostéopathe D.O.",
      description: tMeta("description"),
      slogan: isFr ? "Mouvement • Précision • Performance" : "Movement • Precision • Performance",
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/images/og.svg`, contentUrl: `${SITE.url}/images/og.svg` },
      image: [
        { "@type": "ImageObject", url: PORTRAIT, contentUrl: PORTRAIT, width: 1200, height: 1500, caption: SITE.shortName },
      ],
      email: SITE.email,
      telephone: SITE.phone || undefined,
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Credit Card",
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
      hasMap: `https://www.google.com/maps?q=${SITE.address.latitude},${SITE.address.longitude}`,
      openingHoursSpecification: SITE.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: [
        { "@type": "City", name: "Avignon", containedInPlace: { "@type": "AdministrativeArea", name: "Vaucluse" } },
        { "@type": "City", name: "Le Pontet" },
        { "@type": "City", name: "Villeneuve-lès-Avignon" },
        { "@type": "City", name: "Sorgues" },
        { "@type": "City", name: "Caumont-sur-Durance" },
        { "@type": "City", name: "Morières-lès-Avignon" },
        { "@type": "City", name: "Vedène" },
        { "@type": "AdministrativeArea", name: "Vaucluse" },
        { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
      ],
      availableLanguage: [
        { "@type": "Language", name: "French", alternateName: "fr" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      medicalSpecialty: ["Osteopathic", "Pediatric", "SportsMedicine", "Obstetric"],
      knowsAbout: [
        "Ostéopathie générale",
        "Ostéopathie pédiatrique",
        "Ostéopathie du sport",
        "Ostéopathie périnatale",
        "Biomécanique",
        "Mobilité articulaire",
        "Posture",
        "Prévention des blessures",
      ],
      employee: { "@id": `${SITE.url}/#matthieu` },
      founder: { "@id": `${SITE.url}/#matthieu` },
      potentialAction: {
        "@type": "ReserveAction",
        name: isFr ? "Prendre rendez-vous" : "Book appointment",
        target: {
          "@type": "EntryPoint",
          urlTemplate: SITE.doctolib.url,
          inLanguage: ["fr-FR", "en-US"],
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform",
          ],
        },
        result: {
          "@type": "Reservation",
          name: isFr ? "Consultation d'ostéopathie" : "Osteopathy consultation",
        },
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr ? "Consultation d'ostéopathie" : "Osteopathy consultation",
            description: isFr
              ? "Consultation d'ostéopathie de 45 minutes, tout profil (adulte, sportif, femme enceinte, nourrisson, enfant, senior)."
              : "45-minute osteopathy consultation for all profiles (adults, athletes, expectant mothers, infants, children, seniors).",
          },
          price: SITE.pricing,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "City", name: "Avignon" },
          url: SITE.doctolib.url,
        },
      ],
      sameAs: [SITE.doctolib.url],
    },
    {
      "@type": ["Person", "Physician"],
      "@id": `${SITE.url}/#matthieu`,
      name: "Matthieu Yeghiazarian",
      givenName: "Matthieu",
      familyName: "Yeghiazarian",
      honorificSuffix: "D.O.",
      jobTitle: isFr ? "Ostéopathe D.O." : "Osteopath D.O.",
      description: personDescription,
      url: SITE.url,
      image: { "@type": "ImageObject", url: PORTRAIT, contentUrl: PORTRAIT },
      workLocation: { "@id": `${SITE.url}/#localbusiness` },
      worksFor: { "@id": `${SITE.url}/#localbusiness` },
      knowsLanguage: [
        { "@type": "Language", name: "French", alternateName: "fr" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Collège d'Ostéopathie de Provence",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Aix-en-Provence / Marseille",
          addressCountry: "FR",
        },
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Diplôme d'Ostéopathie (D.O.) — Bac+5",
          recognizedBy: {
            "@type": "Organization",
            name: "Ministère de la Santé (France)",
          },
        },
      ],
      knowsAbout: [
        "Ostéopathie",
        "Ostéopathie pédiatrique",
        "Ostéopathie du sport",
        "Ostéopathie périnatale",
        "Biomécanique",
        "Mobilité articulaire",
        "Jiu-jitsu brésilien",
      ],
      sameAs: [SITE.doctolib.url],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      alternateName: SITE.shortName,
      description: tMeta("description"),
      inLanguage: ["fr-FR", "en-US"],
      publisher: { "@id": `${SITE.url}/#localbusiness` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: tMeta("title"),
      description: tMeta("description"),
      inLanguage: isFr ? "fr-FR" : "en-US",
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#localbusiness` },
      mainEntity: { "@id": `${SITE.url}/#localbusiness` },
      primaryImageOfPage: { "@type": "ImageObject", url: PORTRAIT },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: "2026-04-01",
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : "Home", item: pageUrl },
      ],
    },
  ];

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <a className="skip-link" href="#main">
        {isFr ? "Passer au contenu principal" : "Skip to main content"}
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <StickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </NextIntlClientProvider>
  );
}
