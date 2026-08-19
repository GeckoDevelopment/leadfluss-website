import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu Leadfluss, Ablauf, Kosten und Ergebnissen.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Häufig gestellte Fragen"
        description="Die wichtigsten Antworten zu Ablauf, Kosten und Ergebnissen auf einen Blick."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <dl className="divide-y divide-border border-y border-border">
          {FAQS.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="text-lg font-semibold">{item.q}</dt>
              <dd className="mt-2 text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
