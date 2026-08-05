import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Leadfluss ist die Marketing-Partnerin für Handwerk und Mittelstand – spezialisiert auf planbare Leadgenerierung.",
};

export default function UeberUnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Marketing, das Handwerk versteht"
        description="Wir sind kein Bauchladen-Marketing. Wir konzentrieren uns auf eine Sache: dir planbar neue Kunden zu bringen."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            Leadfluss entstand aus einer einfachen Beobachtung: Die besten
            Betriebe leisten hervorragende Arbeit – aber ihre Auslastung hängt
            zu oft vom Zufall ab. Empfehlungen sind großartig, aber nicht
            planbar.
          </p>
          <p>
            Genau hier setzen wir an. Mit performanten Kampagnen und
            konvertierenden Landingpages machen wir aus Werbebudget einen
            verlässlichen Zufluss an qualifizierten Anfragen – messbar,
            transparent und ohne Marketing-Blabla.
          </p>
          <p>
            Wir arbeiten persönlich, ehrlich und ergebnisorientiert. Kein
            Callcenter, keine leeren Versprechen – sondern ein Partner, der die
            Sprache des Handwerks spricht.
          </p>
        </div>
      </div>
    </>
  );
}
