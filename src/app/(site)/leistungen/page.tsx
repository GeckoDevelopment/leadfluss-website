import type { Metadata } from "next";
import Link from "next/link";
import { Target, MousePointerClick, PhoneCall, LineChart } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Von der Kampagne bis zur konvertierenden Landingpage – so gewinnst du mit Leadfluss planbar neue Kunden.",
};

const SERVICES = [
  {
    icon: Target,
    title: "Kampagnen-Management",
    text: "Meta & Google Ads, die exakt die richtige Zielgruppe in deiner Region erreichen – laufend optimiert für maximale Anfragenqualität.",
  },
  {
    icon: MousePointerClick,
    title: "Landingpage-Erstellung",
    text: "Conversion-optimierte Seiten mit klarer Botschaft, die aus Klicks echte Anfragen machen.",
  },
  {
    icon: PhoneCall,
    title: "Lead-Qualifizierung",
    text: "Vorqualifizierung, damit nur ernsthafte Interessenten bei dir ankommen – keine Zeitverschwender.",
  },
  {
    icon: LineChart,
    title: "Reporting & Optimierung",
    text: "Transparentes Dashboard mit allen Zahlen. Du siehst jederzeit, was dein Budget bringt.",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Alles für deinen planbaren Anfragenfluss"
        description="Wir übernehmen den kompletten Prozess – von der Strategie bis zur laufenden Optimierung."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="border border-border bg-card p-8">
              <span className="flex size-12 items-center justify-center bg-icon-bg text-signal">
                <s.icon className="size-6" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button size="lg" render={<Link href="/kontakt">Termin anfragen</Link>} />
        </div>
      </div>
    </>
  );
}
