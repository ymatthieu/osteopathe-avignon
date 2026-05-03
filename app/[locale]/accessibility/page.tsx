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
    title: isFr ? "Déclaration d'accessibilité" : "Accessibility statement",
    description: isFr
      ? "Engagement d'accessibilité numérique du site osteopatheavignon.com — conformité, contact."
      : "Digital accessibility statement for osteopatheavignon.com — conformance and contact.",
    alternates: {
      canonical: `${SITE.url}${isFr ? "" : "/en"}/accessibility`,
      languages: {
        fr: `${SITE.url}/accessibility`,
        en: `${SITE.url}/en/accessibility`,
        "x-default": `${SITE.url}/accessibility`,
      },
    },
  };
}

export default async function AccessibilityPage({
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
        {isFr ? "Déclaration d'accessibilité" : "Accessibility statement"}
      </h1>
      <p className="text-sm text-ink/60 mt-2">
        {t("last_updated")} : 3 mai 2026
      </p>
      {isFr ? (
        <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
          <p>
            Le cabinet s'engage à rendre son site accessible, conformément à l'article 47 de la loi
            n° 2005-102 du 11 février 2005. Le niveau d'accessibilité visé est WCAG 2.1 AA.
          </p>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">État de conformité</h2>
          <p>
            Le site est en cours d'audit. Les principales mesures déjà en place sont : navigation au clavier,
            structure de titres logique, attributs alt sur les images, contraste suffisant entre texte et
            arrière-plan, respect du paramètre <em>prefers-reduced-motion</em>.
          </p>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">Contenus tiers</h2>
          <p>
            Le widget Doctolib et la carte Google Maps sont des contenus tiers dont l'accessibilité dépend
            de leurs éditeurs respectifs.
          </p>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">Contact</h2>
          <p>
            Si vous rencontrez une difficulté d'accès à un contenu ou à un service du site, vous pouvez
            écrire à <a href={`mailto:${SITE.email}`} className="text-olive-700 underline">{SITE.email}</a>.
            Une réponse vous sera apportée sous 7 jours.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
          <p>
            The practice is committed to making its website accessible, in line with article 47 of French
            law n° 2005-102. The target conformance level is WCAG 2.1 AA.
          </p>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">Conformance status</h2>
          <p>
            The site is currently under audit. Measures already in place include: keyboard navigation,
            logical heading structure, alt attributes on images, sufficient text-background contrast,
            and respect for the <em>prefers-reduced-motion</em> setting.
          </p>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">Third-party content</h2>
          <p>
            The Doctolib booking widget and the Google Maps embed are third-party content whose
            accessibility depends on their respective publishers.
          </p>
          <h2 className="font-serif text-2xl text-olive-800 mt-8 mb-3">Contact</h2>
          <p>
            If you encounter difficulty accessing content or a service on this site, please email{" "}
            <a href={`mailto:${SITE.email}`} className="text-olive-700 underline">{SITE.email}</a>.
            We aim to reply within 7 days.
          </p>
        </div>
      )}
    </article>
  );
}
