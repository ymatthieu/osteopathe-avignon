import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE } from "@/lib/utils";
import { CalendarCheck, ShieldAlert, Hand, Eye, Languages } from "lucide-react";

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
      ? "Ostéopathe pour nourrissons et enfants à Avignon — Matthieu Yeghiazarian D.O."
      : "Osteopath for infants and children in Avignon — Matthieu Yeghiazarian D.O.",
    description: isFr
      ? "Cabinet d'ostéopathie à Avignon accueillant nourrissons, enfants et adolescents — approche manuelle douce, en complément du suivi médical. RDV Doctolib."
      : "Osteopathy practice in Avignon welcoming infants, children, and teenagers — gentle hands-on approach, complementary to medical follow-up. Doctolib booking.",
    alternates: {
      canonical: `${SITE.url}${isFr ? "" : "/en"}/nourrissons-enfants`,
      languages: {
        fr: `${SITE.url}/nourrissons-enfants`,
        en: `${SITE.url}/en/nourrissons-enfants`,
        "x-default": `${SITE.url}/nourrissons-enfants`,
      },
    },
    openGraph: {
      title: isFr
        ? "Ostéopathe pour nourrissons et enfants à Avignon"
        : "Osteopath for infants and children in Avignon",
      description: isFr
        ? "Approche manuelle douce, en complément du suivi médical. Cabinet 38 av. Saint-Ruf."
        : "Gentle manual approach, complementary to medical follow-up. 38 av. Saint-Ruf practice.",
      url: `${SITE.url}${isFr ? "" : "/en"}/nourrissons-enfants`,
      type: "website",
      images: [{ url: PORTRAIT, width: 1200, height: 1500, alt: SITE.shortName }],
    },
  };
}

export default async function NourrissonsEnfantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";

  // Use generic "Service" — NOT MedicalProcedure — to avoid implying a medical claim.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isFr
      ? "Consultation d'ostéopathie pour nourrissons, enfants et adolescents"
      : "Osteopathy consultation for infants, children, and teenagers",
    description: isFr
      ? "Approche manuelle douce, accompagnement en complément du suivi médical. L'ostéopathie ne se substitue pas à un avis médical."
      : "Gentle hands-on approach, support complementary to medical follow-up. Osteopathy does not replace medical advice.",
    serviceType: isFr ? "Ostéopathie" : "Osteopathy",
    provider: { "@id": `${SITE.url}/#localbusiness` },
    areaServed: { "@type": "City", name: "Avignon" },
    url: `${SITE.url}${isFr ? "" : "/en"}/nourrissons-enfants`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : "Home", item: `${SITE.url}${isFr ? "" : "/en"}/` },
      { "@type": "ListItem", position: 2, name: isFr ? "Nourrissons et enfants" : "Infants and children", item: `${SITE.url}${isFr ? "" : "/en"}/nourrissons-enfants` },
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
            {isFr ? "Cabinet d'ostéopathie · Avignon" : "Osteopathy practice · Avignon"}
          </span>
          <h1 className="font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.1] text-olive-800 tracking-tight"
              style={{ fontVariationSettings: "'wght' 460, 'opsz' 144, 'SOFT' 60" }}>
            {isFr
              ? "Ostéopathe pour nourrissons, enfants et adolescents"
              : "Osteopath for infants, children, and teenagers"}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-ink/75 leading-relaxed">
            {isFr
              ? "Une approche manuelle douce, en complément du suivi médical de votre enfant. Cabinet au 38 avenue Saint-Ruf à Avignon."
              : "A gentle manual approach, complementary to your child's medical follow-up. Practice at 38 Avenue Saint-Ruf in Avignon."}
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

        {/* Medical disclaimer — prominent, first content block */}
        <section className="bg-cream-100 py-8">
          <div className="container max-w-3xl">
            <div className="flex gap-4 items-start p-5 rounded-2xl border border-olive-700/15 bg-cream-50">
              <ShieldAlert className="shrink-0 size-5 text-olive-700 mt-0.5" strokeWidth={1.8} />
              <p className="text-sm text-ink/75 leading-relaxed">
                {isFr
                  ? "L'ostéopathie ne se substitue pas à un avis médical. Pour tout symptôme persistant chez votre enfant, consultez en priorité votre médecin traitant ou votre pédiatre. Les consultations proposées s'inscrivent en complément d'un suivi médical adapté."
                  : "Osteopathy does not replace medical advice. For any persistent symptoms in your child, consult your primary care physician or pediatrician first. The consultations offered are intended to complement appropriate medical follow-up."}
              </p>
            </div>
          </div>
        </section>

        {/* What happens during the session — focus on the practice, not on conditions */}
        <section className="container max-w-5xl py-20">
          <h2 className="font-serif text-3xl md:text-4xl text-olive-800 text-center mb-12"
              style={{ fontVariationSettings: "'wght' 460, 'opsz' 96, 'SOFT' 80" }}>
            {isFr ? "Comment se déroule la séance" : "What a session looks like"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Eye,
                fr_t: "Échange préalable",
                en_t: "Initial conversation",
                fr: "Premier temps consacré à l'écoute des parents : grossesse, accouchement, alimentation, sommeil, développement moteur. Les antécédents médicaux sont indispensables.",
                en: "Time spent listening to parents: pregnancy, delivery, feeding, sleep, motor development. Medical history is essential.",
              },
              {
                Icon: Hand,
                fr_t: "Techniques douces",
                en_t: "Gentle techniques",
                fr: "Approche exclusivement manuelle, sans manipulation forcée. Pressions très légères, écoute des tissus, mobilisations adaptées à l'âge.",
                en: "Exclusively manual approach, no forced manipulation. Very light pressure, tissue listening, mobilisations adapted to age.",
              },
              {
                Icon: Languages,
                fr_t: "FR / EN",
                en_t: "EN / FR",
                fr: "Consultations en français ou en anglais, selon la langue parlée à la maison. Utile pour les familles internationales d'Avignon.",
                en: "Consultations in English or French, whichever is spoken at home. Useful for Avignon's international families.",
              },
            ].map(({ Icon, fr_t, en_t, fr, en }) => (
              <div key={fr_t} className="p-6 rounded-2xl bg-cream-100 border border-olive-700/10">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-full bg-olive-100/60 text-olive-700">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-olive-800 mb-2">{isFr ? fr_t : en_t}</h3>
                <p className="text-sm text-ink/75 leading-relaxed">{isFr ? fr : en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Practitioner — credentials, no specialty claim */}
        <section className="bg-cream-100 py-20">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#1a1a1f] shadow-soft">
                <Image src={PORTRAIT} alt="Matthieu Yeghiazarian, Ostéopathe D.O." fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div>
                <h2 className="font-serif text-3xl text-olive-800 mb-6"
                    style={{ fontVariationSettings: "'wght' 460, 'opsz' 96, 'SOFT' 80" }}>
                  {isFr ? "Le praticien" : "The practitioner"}
                </h2>
                <p className="text-base text-ink/80 leading-relaxed mb-4">
                  {isFr
                    ? "Matthieu Yeghiazarian, ostéopathe D.O., exerce au cabinet du 38 avenue Saint-Ruf à Avignon. Il est diplômé du Collège d'Ostéopathie de Provence (Aix-Marseille) — formation initiale de cinq années agréée par le Ministère de la Santé. Il accueille les nourrissons, enfants et adolescents depuis plus de seize ans."
                    : "Matthieu Yeghiazarian, osteopath D.O., practises at 38 Avenue Saint-Ruf in Avignon. He is a graduate of the Collège d'Ostéopathie de Provence (Aix-Marseille) — a five-year initial training programme approved by the French Ministry of Health. He has welcomed infants, children, and teenagers for more than sixteen years."}
                </p>
                <p className="text-base text-ink/80 leading-relaxed">
                  {isFr
                    ? "Sa pratique repose sur l'observation, l'écoute manuelle et des techniques exclusivement douces, adaptées à chaque âge. Le travail s'effectue en lien avec les autres professionnels qui suivent l'enfant — médecin traitant, pédiatre, sage-femme, kinésithérapeute."
                    : "His practice is based on observation, manual listening and exclusively gentle techniques, adapted to each age. The work is carried out in coordination with the other professionals following the child — primary care physician, pediatrician, midwife, physiotherapist."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical info — same as homepage but contextualised */}
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
                <div className="font-serif text-3xl text-olive-700 mb-2">FR / EN</div>
                <div className="text-xs uppercase tracking-[0.14em] text-ink/60">{isFr ? "Langues" : "Languages"}</div>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-ink/70 leading-relaxed">
              {isFr
                ? "Les consultations ne sont pas remboursées par la Sécurité sociale. Une facture est remise après chaque séance pour permettre une éventuelle prise en charge par votre mutuelle. Une ordonnance médicale n'est pas requise pour consulter."
                : "Consultations are not covered by French Social Security. A receipt is provided after each session for possible reimbursement by your private health insurance. A medical prescription is not required to consult."}
            </p>
            <div className="text-center mt-10">
              <a
                href={SITE.doctolib.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 rounded-full bg-olive-700 text-cream-50 px-8 py-4 text-base font-medium shadow-soft hover:bg-olive-800 transition"
              >
                <CalendarCheck className="size-4" strokeWidth={1.8} />
                {isFr ? "Réserver un rendez-vous" : "Book an appointment"}
              </a>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
