import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE } from "@/lib/utils";
import { CalendarCheck, Baby, Heart, Moon, Wind } from "lucide-react";

const PORTRAIT = "/images/Aragon-Headshot-Matthieu-Yeghiazarian-2026-03-23-61.jpeg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "Ostéopathe pédiatrique Avignon — nourrissons & enfants · Matthieu Yeghiazarian D.O."
      : "Pediatric osteopath in Avignon — infants & children · Matthieu Yeghiazarian D.O.",
    description: isFr
      ? "Ostéopathie pédiatrique à Avignon : techniques douces dès la naissance pour déformations crâniennes, troubles digestifs, sommeil agité, ORL. RDV Doctolib."
      : "Pediatric osteopathy in Avignon: gentle techniques from birth for cranial deformities, digestive issues, restless sleep, ENT. Online booking via Doctolib.",
    alternates: {
      canonical: `${SITE.url}${isFr ? "" : "/en"}/services/pediatrie`,
      languages: {
        fr: `${SITE.url}/services/pediatrie`,
        en: `${SITE.url}/en/services/pediatrie`,
        "x-default": `${SITE.url}/services/pediatrie`,
      },
    },
    openGraph: {
      title: isFr
        ? "Ostéopathe pédiatrique à Avignon — nourrissons et enfants"
        : "Pediatric osteopath in Avignon — infants and children",
      description: isFr
        ? "Techniques douces dès la naissance. Cabinet 38 av. Saint-Ruf, Avignon."
        : "Gentle techniques from birth. 38 av. Saint-Ruf practice, Avignon.",
      url: `${SITE.url}${isFr ? "" : "/en"}/services/pediatrie`,
      type: "website",
      images: [{ url: PORTRAIT, width: 1200, height: 1500, alt: SITE.shortName }],
    },
  };
}

export default async function PediatriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: isFr ? "Ostéopathie pédiatrique" : "Pediatric osteopathy",
    description: isFr
      ? "Consultation d'ostéopathie pédiatrique pour nourrissons et enfants à Avignon."
      : "Pediatric osteopathy consultation for infants and children in Avignon.",
    procedureType: "Manual therapy",
    bodyLocation: isFr ? "Crâne, colonne vertébrale, abdomen" : "Skull, spine, abdomen",
    url: `${SITE.url}${isFr ? "" : "/en"}/services/pediatrie`,
    provider: { "@id": `${SITE.url}/#localbusiness` },
    availableStrength: { "@type": "DrugStrength", strengthValue: 60, strengthUnit: "EUR" },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : "Home", item: `${SITE.url}${isFr ? "" : "/en"}/` },
      { "@type": "ListItem", position: 2, name: isFr ? "Services" : "Services", item: `${SITE.url}${isFr ? "" : "/en"}/services/pediatrie` },
      { "@type": "ListItem", position: 3, name: isFr ? "Pédiatrie" : "Pediatrics", item: `${SITE.url}${isFr ? "" : "/en"}/services/pediatrie` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article className="bg-cream-50">
        {/* Hero */}
        <section className="container max-w-4xl pt-32 md:pt-40 pb-16 text-center">
          <Link href="/" className="inline-block text-sm text-olive-700 hover:underline mb-8">
            {isFr ? "← Retour à l'accueil" : "← Back to home"}
          </Link>
          <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-olive-700/80 mb-6">
            {isFr ? "Ostéopathie pédiatrique" : "Pediatric osteopathy"}
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] text-olive-800 tracking-tight"
              style={{ fontVariationSettings: "'wght' 460, 'opsz' 144, 'SOFT' 60" }}>
            {isFr
              ? "Ostéopathe pédiatrique à Avignon"
              : "Pediatric osteopath in Avignon"}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-ink/75 leading-relaxed">
            {isFr
              ? "Techniques douces dès la première semaine de vie. Pour les nourrissons, les enfants et les adolescents — au cabinet du 38 avenue Saint-Ruf."
              : "Gentle techniques from the first week of life. For infants, children, and teenagers — at the 38 Avenue Saint-Ruf practice."}
          </p>
          <a
            href={SITE.doctolib.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 mt-10 rounded-full bg-olive-700 text-cream-50 px-8 py-4 text-base font-medium shadow-soft hover:bg-olive-800 transition"
          >
            <CalendarCheck className="size-4" strokeWidth={1.8} />
            {isFr ? "Prendre rendez-vous" : "Book an appointment"}
          </a>
        </section>

        {/* Why parents come */}
        <section className="bg-cream-100 py-20">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl text-olive-800 text-center mb-12"
                style={{ fontVariationSettings: "'wght' 460, 'opsz' 96, 'SOFT' 80" }}>
              {isFr ? "Pourquoi les parents consultent" : "Why parents consult"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  Icon: Baby,
                  fr_t: "Déformations crâniennes",
                  en_t: "Cranial deformities",
                  fr: "Plagiocéphalie, brachycéphalie : techniques crâniennes douces, surveillance de la mobilité, conseils de positionnement.",
                  en: "Plagiocephaly, brachycephaly: gentle cranial techniques, mobility monitoring, positioning advice.",
                },
                {
                  Icon: Heart,
                  fr_t: "Troubles digestifs",
                  en_t: "Digestive issues",
                  fr: "Régurgitations, coliques, constipation : libération viscérale et travail postural sur le diaphragme.",
                  en: "Regurgitation, colic, constipation: visceral release and postural work on the diaphragm.",
                },
                {
                  Icon: Moon,
                  fr_t: "Sommeil agité",
                  en_t: "Restless sleep",
                  fr: "Réveils fréquents, pleurs inexpliqués : recherche de tensions résiduelles liées à l'accouchement.",
                  en: "Frequent waking, unexplained crying: looking for residual tensions linked to delivery.",
                },
                {
                  Icon: Wind,
                  fr_t: "Troubles ORL fréquents",
                  en_t: "Recurring ENT issues",
                  fr: "Otites à répétition, rhinites chroniques : drainage et mobilité des os temporaux.",
                  en: "Recurring ear infections, chronic rhinitis: drainage and mobility of the temporal bones.",
                },
              ].map(({ Icon, fr_t, en_t, fr, en }) => (
                <div key={fr_t} className="flex gap-5 p-6 rounded-2xl bg-cream-50 border border-olive-700/10">
                  <div className="shrink-0 inline-flex size-11 items-center justify-center rounded-full bg-olive-100/60 text-olive-700">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-olive-800 mb-2">{isFr ? fr_t : en_t}</h3>
                    <p className="text-sm text-ink/75 leading-relaxed">{isFr ? fr : en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the practitioner */}
        <section className="container max-w-4xl py-20">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#1a1a1f] shadow-soft">
              <Image src={PORTRAIT} alt="Matthieu Yeghiazarian, Ostéopathe D.O." fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-3xl text-olive-800 mb-6"
                  style={{ fontVariationSettings: "'wght' 460, 'opsz' 96, 'SOFT' 80" }}>
                {isFr ? "Une approche douce, attentive" : "A gentle, attentive approach"}
              </h2>
              <p className="text-base text-ink/80 leading-relaxed mb-4">
                {isFr
                  ? "Matthieu Yeghiazarian, ostéopathe D.O. depuis plus de 16 ans, prend en charge nourrissons et enfants au cabinet du 38 avenue Saint-Ruf à Avignon. Diplômé du Collège d'Ostéopathie de Provence (Aix-Marseille), il pratique des techniques crâniennes, viscérales et fasciales adaptées à chaque âge."
                  : "Matthieu Yeghiazarian, osteopath D.O. with 16+ years of experience, cares for infants and children at the 38 Avenue Saint-Ruf practice in Avignon. A graduate of the Collège d'Ostéopathie de Provence (Aix-Marseille), he uses cranial, visceral and fascial techniques adapted to each age."}
              </p>
              <p className="text-base text-ink/80 leading-relaxed mb-4">
                {isFr
                  ? "Pour les nouveau-nés, la première séance dure environ 45 minutes et inclut un échange complet avec les parents sur l'accouchement, l'allaitement, le sommeil et le développement moteur. Les techniques utilisées sont strictement sans manipulation forcée — uniquement des pressions douces et des écoutes tissulaires."
                  : "For newborns, the first session lasts about 45 minutes and includes a full discussion with parents about birth, feeding, sleep, and motor development. The techniques used involve no forced manipulation — only gentle pressure and tissue listening."}
              </p>
              <p className="text-base text-ink/80 leading-relaxed">
                {isFr
                  ? "Les consultations sont possibles en français et en anglais — utile pour les familles internationales installées à Avignon ou de passage."
                  : "Consultations are available in English and French — useful for international families settled in Avignon or visiting."}
              </p>
            </div>
          </div>
        </section>

        {/* Practical info */}
        <section className="bg-cream-200 py-20">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-3xl text-olive-800 text-center mb-12"
                style={{ fontVariationSettings: "'wght' 460, 'opsz' 96, 'SOFT' 80" }}>
              {isFr ? "Informations pratiques" : "Practical information"}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-cream-50">
                <div className="font-serif text-3xl text-olive-700 mb-2">60 €</div>
                <div className="text-xs uppercase tracking-[0.14em] text-ink/60">{isFr ? "Consultation" : "Consultation"}</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-cream-50">
                <div className="font-serif text-3xl text-olive-700 mb-2">{isFr ? "30–45 min" : "30–45 min"}</div>
                <div className="text-xs uppercase tracking-[0.14em] text-ink/60">{isFr ? "Durée moyenne" : "Average duration"}</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-cream-50">
                <div className="font-serif text-3xl text-olive-700 mb-2">{isFr ? "Dès la naissance" : "From birth"}</div>
                <div className="text-xs uppercase tracking-[0.14em] text-ink/60">{isFr ? "Âge" : "Age"}</div>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-ink/70 leading-relaxed">
              {isFr
                ? "L'ostéopathie n'est pas remboursée par la Sécurité sociale. La majorité des mutuelles couvrent 2 à 6 séances par an. Une facture est remise après chaque consultation."
                : "Osteopathy is not covered by French Social Security. Most private health insurance covers 2 to 6 sessions per year. A receipt is provided after each consultation."}
            </p>
            <div className="text-center mt-10">
              <a
                href={SITE.doctolib.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 rounded-full bg-olive-700 text-cream-50 px-8 py-4 text-base font-medium shadow-soft hover:bg-olive-800 transition"
              >
                <CalendarCheck className="size-4" strokeWidth={1.8} />
                {isFr ? "Réserver pour mon enfant" : "Book for my child"}
              </a>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
