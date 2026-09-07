import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { JsonLd } from "@/components/site/json-ld";
import { FAQ_CATEGORIES } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu Leadfluss, Ablauf, Kosten und Ergebnissen.",
  alternates: { canonical: "/faq" },
};

// FAQPage-Schema für Rich Results in der Google-Suche.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((category) => category.items).map(
    (item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }),
  ),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHeader
        eyebrow="FAQ"
        title="Häufig gestellte Fragen"
        description="Die wichtigsten Antworten zu Ablauf, Kosten und Ergebnissen auf einen Blick."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl space-y-14">
          {FAQ_CATEGORIES.map((category) => (
            <section key={category.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-signal">
                {category.title}
              </h2>
              <div className="mt-4 divide-y divide-border border-y border-border">
                {category.items.map((item) => (
                  <details
                    key={item.q}
                    className="group [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-lg font-semibold">
                      <span>{item.q}</span>
                      <ChevronDown
                        aria-hidden
                        className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <p className="pb-6 text-muted-foreground">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
