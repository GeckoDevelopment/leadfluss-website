import { WistiaPlayer } from "@/components/site/wistia-player";
import { CalendlyEmbed } from "@/components/site/calendly-embed";
import type { VideomarketingPage } from "@/lib/videomarketing";

// Calendly-Buchungslink für das kostenfreie Erstgespräch (identisch auf allen
// Branchenseiten). primary_color = Signal-Grün.
const CALENDLY_URL =
  "https://calendly.com/leadfluss/erstgespraech-leadfluss?primary_color=00c281";

// Gemeinsames Layout aller Videomarketing-Branchenseiten. Der Aufbau
// (Hero → Schritt 1 mit Video → Schritt 2 mit Calendly-Kalender) ist überall
// identisch; die branchentypischen Inhalte kommen aus `page`.
export function VideoLanding({ page }: { page: VideomarketingPage }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--signal),transparent_88%),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-signal">
            Regionales Videomarketing
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {page.intro}
          </p>
        </div>
      </section>

      {/* Schritt 1: Video – schmaler Lesecontainer */}
      <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 sm:pt-20">
        <section className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center bg-signal text-lg font-bold text-white">
              1
            </span>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Schauen Sie das kurze Video unterhalb an
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {page.step1Sub}
          </p>
          <div className="mt-6">
            <WistiaPlayer
              mediaId={page.video.mediaId}
              aspect={page.video.aspect}
              swatchPadding={page.video.swatchPadding}
            />
          </div>
        </section>
      </div>

      {/* Schritt 2: Erstgespräch buchen (Calendly) – volle Seitenbreite, damit
          Calendly die zweispaltige Ansicht (Infos links, Kalender rechts)
          rendert. Unterhalb des Breakpoints stapelt Calendly von sich aus. */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <section className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center bg-signal text-lg font-bold text-white">
              2
            </span>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Kostenfreies Erstgespräch buchen
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {page.step2Sub}
          </p>
          <div className="mt-6">
            <CalendlyEmbed url={CALENDLY_URL} />
          </div>
        </section>
      </div>
    </>
  );
}
