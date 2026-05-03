"use client";

import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { Star } from "lucide-react";
import { REVIEWS, REVIEW_STATS, type Review } from "@/lib/reviews";
import { SITE } from "@/lib/utils";

/**
 * Real Google reviews — sourced from `lib/reviews.ts`, which mirrors the public
 * GBP profile verbatim. Renders an aggregate rating header, each review
 * verbatim with attribution and date, and links back to Google to verify or
 * leave a new one. No fake quotes, no scraping, no third-party widget.
 */
export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as "fr" | "en";

  const dateFmt = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    year: "numeric",
    month: "long",
  });

  const average = REVIEW_STATS.average.toFixed(1).replace(".", locale === "fr" ? "," : ".");

  return (
    <section className="bg-cream-100 py-28 md:py-36">
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
          <Reveal delay={0.18}>
            <p className="mt-5 text-base text-ink-muted leading-relaxed">{t("intro")}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <a
              href={SITE.gbp.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-olive-700/15 bg-cream-50 px-5 py-2.5 text-sm text-olive-700 hover:bg-cream-50/70 transition"
              aria-label={t("see_all")}
            >
              <span className="flex items-center gap-0.5" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-amber-500 text-amber-500" strokeWidth={1} />
                ))}
              </span>
              <span className="tabular-nums">
                {t("rating_summary", { average, count: REVIEW_STATS.count })}
              </span>
            </a>
          </Reveal>
        </div>

        <div
          className={
            REVIEWS.length === 1
              ? "max-w-2xl mx-auto"
              : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          }
        >
          {REVIEWS.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <ReviewCard review={r} viewerLocale={locale} dateFmt={dateFmt} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.gbp.mapsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-olive-600/20 bg-cream-50 px-6 py-2.5 text-sm text-olive-700 hover:bg-cream-100 transition"
            >
              {t("see_all")} →
            </a>
            <a
              href={SITE.gbp.reviewUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-olive-700 px-6 py-2.5 text-sm text-cream-50 hover:bg-olive-700/90 transition"
            >
              {t("leave_review")} →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  viewerLocale,
  dateFmt,
}: {
  review: Review;
  viewerLocale: "fr" | "en";
  dateFmt: Intl.DateTimeFormat;
}) {
  const t = useTranslations("testimonials");
  const showTranslation =
    review.lang !== viewerLocale && review.translations?.[viewerLocale];
  const dateObj = new Date(review.date);
  const formattedDate = dateFmt.format(dateObj);
  const initial = review.author.trim().charAt(0).toUpperCase();

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className="rounded-2xl border border-olive-700/10 bg-cream-50 p-7 md:p-8 shadow-sm hover:shadow-md transition"
    >
      <meta itemProp="itemReviewed" content={SITE.name} />
      <header className="flex items-start gap-4">
        <div
          aria-hidden
          className="grid place-items-center size-11 shrink-0 rounded-full bg-olive-700/10 font-serif text-lg text-olive-700"
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
            className="font-serif text-lg text-olive-700 truncate"
          >
            <span itemProp="name">{review.author}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-muted">
            <span
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
              className="flex items-center gap-0.5"
              aria-label={`${review.rating} / 5`}
            >
              <meta itemProp="ratingValue" content={String(review.rating)} />
              <meta itemProp="bestRating" content="5" />
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={
                    i <= review.rating
                      ? "size-3.5 fill-amber-500 text-amber-500"
                      : "size-3.5 text-olive-700/20"
                  }
                  strokeWidth={1}
                  aria-hidden
                />
              ))}
            </span>
            <span aria-hidden>·</span>
            <time itemProp="datePublished" dateTime={review.date}>
              {formattedDate}
            </time>
          </div>
        </div>
      </header>

      <blockquote
        itemProp="reviewBody"
        lang={review.lang}
        className="mt-5 text-[0.97rem] leading-relaxed text-ink before:content-['“'] before:mr-0.5 after:content-['”'] after:ml-0.5"
      >
        {review.body}
      </blockquote>

      {showTranslation && (
        <p className="mt-3 text-sm italic text-ink-muted leading-relaxed">
          <span className="not-italic font-medium text-olive-700/80">
            {t("translation_label")} —{" "}
          </span>
          {review.translations?.[viewerLocale]}
        </p>
      )}

      <footer className="mt-5 pt-5 border-t border-olive-700/10 flex items-center justify-between text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <GoogleGlyph className="size-4" />
          {t("verified_on_google")}
        </span>
        <a
          href={SITE.gbp.mapsUrl}
          target="_blank"
          rel="noopener"
          className="text-olive-700 hover:underline underline-offset-4"
        >
          Google →
        </a>
      </footer>
    </article>
  );
}

function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.57 2.69-3.88 2.69-6.63z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.36 0-4.36-1.59-5.07-3.74H.96v2.34A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.93 10.68A5.4 5.4 0 0 1 3.64 9c0-.58.1-1.15.29-1.68V4.98H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.02l2.97-2.34z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.98l2.97 2.34C4.64 5.17 6.64 3.58 9 3.58z"
      />
    </svg>
  );
}
