import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr ? "Politique de confidentialité" : "Privacy policy",
    description: isFr
      ? "Politique de confidentialité du cabinet d'ostéopathie Matthieu Yeghiazarian — données collectées, finalités, vos droits."
      : "Privacy policy for the osteopathy practice of Matthieu Yeghiazarian — data collected, purpose, your rights.",
    alternates: {
      canonical: `${SITE.url}${isFr ? "" : "/en"}/privacy`,
      languages: {
        fr: `${SITE.url}/privacy`,
        en: `${SITE.url}/en/privacy`,
        "x-default": `${SITE.url}/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const isFr = locale === "fr";

  return (
    <article className="container max-w-3xl py-32 md:py-40 prose prose-stone">
      <Link href="/" className="text-sm text-olive-700 hover:underline">
        ← {t("back_home")}
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl text-olive-800 mt-6 leading-tight">
        {isFr ? "Politique de confidentialité" : "Privacy policy"}
      </h1>
      <p className="text-sm text-ink/60 mt-2">
        {t("last_updated")} : 3 mai 2026
      </p>

      {isFr ? (
        <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">1. Responsable du traitement</h2>
            <p>
              Matthieu Yeghiazarian, ostéopathe D.O., 38 avenue Saint-Ruf, 84000 Avignon, France.
              Email : <a href={`mailto:${SITE.email}`} className="text-olive-700 underline">{SITE.email}</a>.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">2. Données collectées</h2>
            <p>
              Le site lui-même ne collecte aucune donnée personnelle directement. Les données saisies dans Doctolib
              (nom, prénom, email, téléphone, motif de consultation) sont traitées par Doctolib selon sa propre
              politique de confidentialité, accessible depuis le widget de réservation.
            </p>
            <p>
              Lors de la consultation, les informations médicales nécessaires à votre suivi (antécédents,
              symptômes, examens) sont recueillies et conservées sous forme de dossier patient, conformément
              au Code de la santé publique.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">3. Cookies et traceurs</h2>
            <p>
              Ce site n'utilise aucun cookie analytique ni publicitaire. Deux contenus tiers peuvent
              déposer des cookies fonctionnels lorsqu'ils sont chargés :
            </p>
            <ul className="list-disc pl-6">
              <li>Le widget Doctolib, pour la prise de rendez-vous en ligne.</li>
              <li>La carte Google Maps intégrée à la page Contact.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">4. Vos droits</h2>
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
              de rectification, d'effacement, de portabilité et d'opposition. Pour exercer ces droits,
              contactez {SITE.email}. En cas de difficulté, vous pouvez également saisir la CNIL
              (<a href="https://www.cnil.fr" className="text-olive-700 underline">www.cnil.fr</a>).
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">5. Hébergement</h2>
            <p>
              Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>
        </div>
      ) : (
        <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">1. Data controller</h2>
            <p>
              Matthieu Yeghiazarian, osteopath D.O., 38 avenue Saint-Ruf, 84000 Avignon, France.
              Email: <a href={`mailto:${SITE.email}`} className="text-olive-700 underline">{SITE.email}</a>.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">2. Data we collect</h2>
            <p>
              The site itself does not collect any personal data directly. Information you enter in
              Doctolib (name, email, phone, reason for visit) is processed by Doctolib under its own
              privacy policy.
            </p>
            <p>
              During your consultation, medical information needed for your follow-up (history, symptoms,
              exams) is collected and stored as a patient record, in accordance with the French Public
              Health Code.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">3. Cookies and trackers</h2>
            <p>
              This site uses no analytics or advertising cookies. Two third-party embeds may set
              functional cookies when loaded:
            </p>
            <ul className="list-disc pl-6">
              <li>The Doctolib booking widget.</li>
              <li>The Google Maps embed on the Contact section.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">4. Your rights</h2>
            <p>
              Under GDPR and French law, you have rights of access, rectification, erasure, portability
              and objection regarding your personal data. To exercise them, contact {SITE.email}. You may
              also lodge a complaint with the French data protection authority CNIL
              (<a href="https://www.cnil.fr" className="text-olive-700 underline">www.cnil.fr</a>).
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">5. Hosting</h2>
            <p>
              The site is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA.
            </p>
          </section>
        </div>
      )}
    </article>
  );
}
