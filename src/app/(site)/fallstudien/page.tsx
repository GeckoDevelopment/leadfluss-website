import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { getCaseStudies } from "@/sanity/lib/case-studies";

export const metadata: Metadata = {
  title: "Fallstudien",
  description: "Echte Ergebnisse aus der Zusammenarbeit mit dem Mittelstand.",
};

export const revalidate = 60;

export default async function FallstudienPage() {
  const cases = await getCaseStudies();

  return (
    <>
      <PageHeader
        eyebrow="Fallstudien"
        title="Ergebnisse, die für sich sprechen"
        description="Ein Auszug aus Betrieben, die mit Leadfluss planbar neue Anfragen gewinnen."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c._id}
              className="flex flex-col border border-border bg-card p-6"
            >
              {(c.location || c.branch) && (
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MapPin className="size-3.5 text-signal" />
                  {[c.location, c.branch].filter(Boolean).join(" · ")}
                </div>
              )}
              <h2 className="mt-3 text-lg font-semibold">{c.name}</h2>
              {c.role && (
                <div className="text-sm text-muted-foreground">{c.role}</div>
              )}
              {c.text && (
                <p className="mt-3 flex-1 text-sm text-foreground/90">{c.text}</p>
              )}
              <div className="mt-5 border-t border-border pt-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Ergebnis
                </div>
                <div className="mt-1 font-heading text-xl font-bold text-signal">
                  {c.result}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button
            size="lg"
            render={<Link href="/anfrage">Auch solche Ergebnisse wollen</Link>}
          />
        </div>
      </div>
    </>
  );
}
