import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { ProjektbeispielGallery } from "@/components/site/projektbeispiel-gallery";
import { getProjektbeispiele } from "@/sanity/lib/projektbeispiele";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Projektbeispiele",
  description:
    "Referenz-Videos und Werbegrafiken unserer Kundenprojekte – nach Branche und Typ gefiltert und durchsuchbar.",
  // Nur über den direkten Link erreichbar, nicht bei Google gelistet.
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function ProjektbeispielePage() {
  const items = await getProjektbeispiele();

  return (
    <>
      <PageHeader
        eyebrow="Referenzen"
        title="Projektbeispiele"
        description="Videos und Werbegrafiken unserer Kundenprojekte – nach Typ und Branche filtern oder nach Firma und Titel suchen."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {!isSanityConfigured ? (
          <p className="rounded-lg border border-border bg-muted/40 p-6 text-muted-foreground">
            Sanity ist in dieser Umgebung nicht verbunden (Demo-Modus).
          </p>
        ) : items.length === 0 ? (
          <p className="rounded-lg border border-border bg-muted/40 p-6 text-muted-foreground">
            Noch keine Projektbeispiele vorhanden. Lege im{" "}
            <a href="/studio" className="text-signal underline">
              Studio
            </a>{" "}
            unter <strong>Projektbeispiel</strong> ein Video oder eine Grafik an
            (Firma + Branche zuweisen) und veröffentliche es.
          </p>
        ) : (
          <ProjektbeispielGallery items={items} />
        )}
      </div>
    </>
  );
}
