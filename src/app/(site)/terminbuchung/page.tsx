import type { Metadata } from "next";
import { CalendlyEmbed } from "@/components/site/calendly-embed";
import { CALENDLY_URL } from "@/lib/calendly";

export const metadata: Metadata = {
  title: "Terminbuchung",
  description:
    "Sichere dir dein kostenfreies Erstgespräch – wähle einfach eine passende Zeit im Kalender.",
  // Buchungsschritt nach dem Anfrageformular – nicht indexieren.
  robots: { index: false, follow: false },
};

export default function TerminbuchungPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Kostenfreies Erstgespräch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Suche dir eine passende Zeit aus und speichere dir automatisch deinen
          Termin im Kalender. Wir freuen uns auf das Gespräch mit dir!
        </p>
      </div>
      <div className="mt-10">
        <CalendlyEmbed url={CALENDLY_URL} />
      </div>
    </div>
  );
}
