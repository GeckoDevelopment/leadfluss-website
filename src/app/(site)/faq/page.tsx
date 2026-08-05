import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu Leadfluss, Ablauf, Kosten und Ergebnissen.",
};

const FAQS = [
  {
    q: "Für wen ist Leadfluss geeignet?",
    a: "Für Handwerksbetriebe und mittelständische Unternehmen, die planbar neue Kundenanfragen gewinnen möchten – unabhängig von Empfehlungen und Zufall.",
  },
  {
    q: "Wie schnell sehe ich Ergebnisse?",
    a: "In der Regel starten die ersten qualifizierten Anfragen innerhalb der ersten 30 Tage nach Launch der Kampagne.",
  },
  {
    q: "Gibt es eine lange Vertragsbindung?",
    a: "Nein. Wir setzen auf Ergebnisse statt auf lange Knebelverträge. Die Zusammenarbeit ist fair und flexibel.",
  },
  {
    q: "Was kostet die Zusammenarbeit?",
    a: "Das hängt von deinem Ziel und Markt ab. Im kostenlosen Erstgespräch klären wir, was für deinen Betrieb sinnvoll ist.",
  },
  {
    q: "Übernehmt ihr auch die Landingpage?",
    a: "Ja. Conversion-optimierte Landingpages sind fester Bestandteil – denn ohne sie verpufft das beste Kampagnenbudget.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Häufige Fragen"
        description="Die wichtigsten Antworten rund um die Zusammenarbeit mit Leadfluss."
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
