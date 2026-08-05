import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Fallstudien",
  description: "Echte Ergebnisse aus der Zusammenarbeit mit Handwerksbetrieben.",
};

const CASES = [
  {
    branch: "Dachdeckerei",
    result: "42 Anfragen in 30 Tagen",
    text: "Von schwankender Auslastung zu einem planbar gefüllten Auftragsbuch.",
  },
  {
    branch: "Elektrobetrieb",
    result: "18 qualifizierte Termine / Monat",
    text: "Konstanter Zufluss an Sanierungs- und Neubauanfragen.",
  },
  {
    branch: "Garten- & Landschaftsbau",
    result: "3× mehr Anfragen",
    text: "Deutlich höhere Nachfrage für margenstarke Projekte.",
  },
];

export default function FallstudienPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fallstudien"
        title="Ergebnisse, die für sich sprechen"
        description="Ein Auszug aus Betrieben, die mit Leadfluss planbar neue Kunden gewinnen."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {CASES.map((c) => (
            <div key={c.branch} className="border border-border bg-card p-8">
              <div className="text-sm font-semibold uppercase tracking-wider text-signal">
                {c.branch}
              </div>
              <div className="mt-3 font-heading text-2xl font-bold">
                {c.result}
              </div>
              <p className="mt-2 text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button size="lg" render={<Link href="/kontakt">Auch solche Ergebnisse wollen</Link>} />
        </div>
      </div>
    </>
  );
}
