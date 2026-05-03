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
    title: isFr ? "Mentions légales" : "Legal notice",
    description: isFr
      ? "Mentions légales du site osteopatheavignon.com — éditeur, hébergement, propriété intellectuelle."
      : "Legal notice for osteopatheavignon.com — publisher, hosting, intellectual property.",
    alternates: {
      canonical: `${SITE.url}${isFr ? "" : "/en"}/mentions-legales`,
      languages: {
        fr: `${SITE.url}/mentions-legales`,
        en: `${SITE.url}/en/mentions-legales`,
        "x-default": `${SITE.url}/mentions-legales`,
      },
    },
  };
}

export default async function MentionsPage({
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
        {isFr ? "Mentions légales" : "Legal notice"}
      </h1>
      <p className="text-sm text-ink/60 mt-2">
        {t("last_updated")} : 3 mai 2026
      </p>

      <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">
            {isFr ? "Éditeur du site" : "Publisher"}
          </h2>
          <p>
            Matthieu Yeghiazarian, ostéopathe D.O.<br />
            38 avenue Saint-Ruf, 84000 Avignon, France<br />
            Email : <a href={`mailto:${SITE.email}`} className="text-olive-700 underline">{SITE.email}</a>
          </p>
          <p>
            {isFr
              ? "Profession réglementée — Ostéopathe, exercice autorisé selon le décret n° 2007-435 du 25 mars 2007."
              : "Regulated profession — Osteopath, practice authorized under French decree n° 2007-435 of 25 March 2007."}
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">
            {isFr ? "Directeur de la publication" : "Publishing director"}
          </h2>
          <p>Matthieu Yeghiazarian.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">{isFr ? "Hébergement" : "Hosting"}</h2>
          <p>
            Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis ·{" "}
            <a href="https://vercel.com" className="text-olive-700 underline">vercel.com</a>
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">
            {isFr ? "Propriété intellectuelle" : "Intellectual property"}
          </h2>
          <p>
            {isFr
              ? "L'ensemble des contenus présents sur le site (textes, images, logo, mise en page) est protégé par le droit d'auteur. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite."
              : "All content on this site (text, images, logo, layout) is protected by copyright. Any reproduction, in whole or in part, without prior written authorization is prohibited."}
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">
            {isFr ? "Médiation de la consommation" : "Consumer mediation"}
          </h2>
          <p>
            {isFr
              ? "Conformément à l'article L612-1 du Code de la consommation, en cas de litige, vous pouvez saisir gratuitement le médiateur de la consommation : Médiation de la consommation des professions libérales (Médicys), 73 boulevard de Clichy, 75009 Paris — www.medicys.fr."
              : "Under article L612-1 of the French Consumer Code, in the event of a dispute, you may refer the matter free of charge to the consumer mediator: Médicys, 73 boulevard de Clichy, 75009 Paris — www.medicys.fr."}
          </p>
        </section>
      </div>
    </article>
  );
}
