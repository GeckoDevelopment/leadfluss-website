import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu Leadfluss, Ablauf, Kosten und Ergebnissen.",
};

const FAQS = [
  {
    q: "Welche Art von Filmen könnt ihr erstellen?",
    a: "Wir produzieren Imagefilme, Kurzformvideos, Werbevideos, Kundenstimmen (Testimonials) und Firmenpräsentationen – alles aus einer Hand.",
  },
  {
    q: "Wie schnell könnt ihr einen Werbefilm realisieren?",
    a: "Das hängt vom Umfang deiner Videokampagne ab – in der Regel dauert es zwischen 2 und 6 Wochen. Wir fragen dich vorab, bis wann dein Video fertig sein soll, und richten unsere Planung danach aus.",
  },
  {
    q: "Was kostet eine Videoproduktion bei euch?",
    a: "Das richtet sich nach dem Aufwand: Je individueller und aufwendiger die Filme sind, desto höher die nötige Investition. In einem kostenlosen Erstgespräch geben wir dir bereits eine grobe Preiseinschätzung mit.",
  },
  {
    q: "Wofür kann ich die Werbefilme einsetzen?",
    a: "Die Filme sind vielseitig einsetzbar – zum Beispiel für die Neukundengewinnung, fürs Recruiting, auf deiner Website, in den sozialen Medien, auf YouTube, als Werbeanzeige, als Erklärfilm, als Firmenpräsentation, auf Messen oder einfach zum Verschicken.",
  },
  {
    q: "Wie läuft so ein Videodreh bei euch ab – von der Anfrage bis zum fertigen Film?",
    a: "Wir starten mit der Erstellung des Drehplans. Anschließend legen wir gemeinsam einen Termin für den Drehtag fest. An diesem Tag entstehen alle relevanten Aufnahmen. Danach geht es in die Nachproduktion – und zum Schluss liefern wir dir die fertigen Videos und Filme aus.",
  },
];

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
