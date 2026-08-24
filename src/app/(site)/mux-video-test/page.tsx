import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { MuxVideoPlayer } from "@/components/site/mux-video-player";
import { getMuxVideos } from "@/sanity/lib/mux-video";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Video-Test (Mux)",
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function MuxVideoTestPage() {
  const videos = await getMuxVideos();

  return (
    <>
      <PageHeader
        eyebrow="Intern"
        title="Video-Test (Mux)"
        description="Test: Video im Studio hochladen (läuft über Mux) und hier per Streaming-Player ausspielen – adaptive Qualität, kein Roh-Datei-Download."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl space-y-12">
          {!isSanityConfigured && (
            <p className="rounded-lg border border-border bg-muted/40 p-4 text-muted-foreground">
              Sanity ist in dieser Umgebung nicht verbunden (Demo-Modus).
            </p>
          )}

          {isSanityConfigured && videos.length === 0 && (
            <p className="rounded-lg border border-border bg-muted/40 p-4 text-muted-foreground">
              Noch kein Mux-Video vorhanden. Öffne{" "}
              <a href="/studio" className="text-signal underline">
                das Studio
              </a>
              , lege unter <strong>Video (Mux)</strong> ein Dokument an, lade ein
              Video hoch und veröffentliche es.
            </p>
          )}

          {videos.map((v) => (
            <section key={v._id} className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">{v.title}</h2>
              {v.playbackId ? (
                <MuxVideoPlayer
                  playbackId={v.playbackId}
                  title={v.title}
                  aspectRatio={v.aspectRatio}
                  poster={v.posterUrl}
                />
              ) : (
                <p className="rounded-lg border border-border bg-muted/40 p-4 text-muted-foreground">
                  Mux verarbeitet dieses Video noch (Status:{" "}
                  {v.status ?? "unbekannt"}). Kurz warten und Seite neu laden.
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Streaming über Mux · adaptive Qualität je nach Gerät/Verbindung ·
                Sanity speichert nur die Referenz (schlanker Storage).
              </p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
