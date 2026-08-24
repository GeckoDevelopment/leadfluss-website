import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { KundenvideoGallery } from "@/components/site/kundenvideo-gallery";
import { getKundenvideos } from "@/sanity/lib/kundenvideos";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Kundenvideos",
  description:
    "Referenz-Videos unserer Kundenprojekte nach Branche gefiltert und durchsuchbar.",
  // Nur über den direkten Link erreichbar, nicht bei Google gelistet.
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function KundenvideosPage() {
  const videos = await getKundenvideos();

  return (
    <>
      <PageHeader
        eyebrow="Referenzen"
        title="Kundenvideos"
        description="Alle produzierten Kundenvideos – nach Branche filtern oder nach Firma und Videoname suchen."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {!isSanityConfigured ? (
          <p className="rounded-lg border border-border bg-muted/40 p-6 text-muted-foreground">
            Sanity ist in dieser Umgebung nicht verbunden (Demo-Modus).
          </p>
        ) : videos.length === 0 ? (
          <p className="rounded-lg border border-border bg-muted/40 p-6 text-muted-foreground">
            Noch keine Kundenvideos vorhanden. Lege im{" "}
            <a href="/studio" className="text-signal underline">
              Studio
            </a>{" "}
            unter <strong>Kundenvideo</strong> Videos an (Firma + Branche
            zuweisen) und veröffentliche sie.
          </p>
        ) : (
          <KundenvideoGallery videos={videos} />
        )}
      </div>
    </>
  );
}
