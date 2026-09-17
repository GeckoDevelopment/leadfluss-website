import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  Check,
  ArrowRight,
  Flag,
  AlertCircle,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MuxVideo } from "@/components/site/mux-video";
import { ReferenceCarousel } from "@/components/site/reference-carousel";
import { FRANCHISE_PLAYBACK_ID } from "@/lib/videos";
import {
  getFranchiseReferences,
  type Projektbeispiel,
} from "@/sanity/lib/projektbeispiele";

// Titel + Textblöcke der jeweiligen Referenz-Sektion (Zuordnung über den
// Firmennamen).
type SectionTone = "neutral" | "danger" | "signal";
const SECTION_TONE: Record<SectionTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  danger: "bg-red-100 text-red-600",
  signal: "bg-icon-bg text-signal",
};
type ReferenceContent = {
  match: RegExp;
  title?: string;
  /** Seite des Video-Karussells auf Desktop (Standard: rechts). */
  videoSide?: "left" | "right";
  /** Maximale Breite des Karussells in px (Standard 450). */
  carouselWidth?: number;
  sections?: {
    label: string;
    text: string;
    icon: LucideIcon;
    tone?: SectionTone;
  }[];
};
const REFERENCE_CONTENT: ReferenceContent[] = [
  {
    match: /extrawurst/i,
    title:
      "So erschließt Extrawurst planbar neue Franchisestandorte, ohne teure Portale oder hohe Provisionen für Vermittler",
    sections: [
      {
        icon: Flag,
        tone: "neutral",
        label: "Ausgangssituation",
        text: "Bereits vor der Zusammenarbeit war Extrawurst ein erfolgreiches Franchisesystem mit 29 Standorten, geführt von 12 Franchisenehmern. Dazu kommen noch 11 Eigenbetriebe, die sie selber führen. Der Geschäftsführer Kim Hagebaum hatte ein klares Ziel: Weitere Standorte und Franchisepartner planbar aufbauen.",
      },
      {
        icon: AlertCircle,
        tone: "danger",
        label: "Problem",
        text: "Auf den Portalen ist Extrawurst ein Anbieter von vielen. Außerdem ist die Sichtbarkeit begrenzt auf die geringe monatliche Anzahl der Seitenbesucher der Plattform. Vorherige Versuche, über Social Media zusätzliche Partner zu gewinnen waren mit mehr Aufwand verbunden als sie Ergebnisse gebracht haben.",
      },
      {
        icon: Lightbulb,
        label: "Lösung",
        text: "Die Angst, dass es irgendwann zu spät für die Selbstständigkeit sein könnte. Die Angst vor dem Scheitern. Die Sorge vor finanzieller Unsicherheit. Genau diese Schmerzpunkte seiner Zielgruppe haben wir in den neuen Videoanzeigen adressiert. Somit bewegt er mehr Interessenten dazu, sich als potentieller Partner zu bewerben.",
      },
    ],
  },
  {
    match: /immergrün|immergruen/i,
    videoSide: "left",
    carouselWidth: 563,
    title:
      "So gewinnt Immergrün jeden Monat 30 zusätzliche Bewerbungen von potentiellen Franchisenehmern in seinen freien Gebieten",
    sections: [
      {
        icon: Flag,
        tone: "neutral",
        label: "Ausgangssituation",
        text: "Immergrün ist ein bekannter Name in der deutschen Franchise-Landschaft. Trotz des beträchtlichen Partnerstamms ist die Zielstellung weiterhin auf Wachstum ausgerichtet. Es gibt weiterhin Standorte, die besetzt werden sollen. In manchen Fällen werden auch Nachfolger gesucht.",
      },
      {
        icon: AlertCircle,
        tone: "danger",
        label: "Problem",
        text: "Das Immergrün hatte keine zeitlichen Kapazitäten, sich um das Schalten von Werbeanzeigen zu kümmern. Neben den täglichen Aufgaben wie Standortsuche, Finanzierungen, Schulungen und Gespräche mit bestehenden Franchisenehmern blieb keine Zeit für das Wesentliche: Die Akquise von neuen Partnern.",
      },
      {
        icon: Lightbulb,
        tone: "signal",
        label: "Lösung",
        text: "Immergrün hat uns Bildmaterial zugesendet, aus dem wir im ersten Schritt Videoanzeigen entwickelt haben. An 5 konkreten Standorten laufen derzeit Werbekampagnen auf Social Media, auf die sich pro Woche zwischen 6 bis 8 Interessenten melden, um als neue Partner beim Franchise zu starten.",
      },
    ],
  },
];
function referenceContent(name: string): ReferenceContent | undefined {
  return REFERENCE_CONTENT.find((c) => c.match.test(name));
}

// Optional: welches Video pro Firma als erstes im Karussell erscheinen soll
// (Zuordnung über Firmenname + Video-Titel).
const REFERENCE_FIRST_VIDEO: { match: RegExp; titleMatch: RegExp }[] = [
  { match: /extrawurst/i, titleMatch: /imbiss selbstständig/i },
];
function orderVideos(
  name: string,
  videos: Projektbeispiel[],
): Projektbeispiel[] {
  const cfg = REFERENCE_FIRST_VIDEO.find((c) => c.match.test(name));
  if (!cfg) return videos;
  const idx = videos.findIndex((v) => cfg.titleMatch.test(v.title ?? ""));
  if (idx <= 0) return videos;
  return [videos[idx], ...videos.slice(0, idx), ...videos.slice(idx + 1)];
}

// Referenz-Videos nach Firma gruppieren (Reihenfolge bleibt erhalten).
type ReferenceGroup = { name: string; logoUrl?: string; videos: Projektbeispiel[] };
function groupByCompany(items: Projektbeispiel[]): ReferenceGroup[] {
  const groups: ReferenceGroup[] = [];
  for (const item of items) {
    const name = item.company?.name ?? "";
    let group = groups.find((g) => g.name === name);
    if (!group) {
      group = { name, logoUrl: item.company?.logoUrl, videos: [] };
      groups.push(group);
    }
    group.videos.push(item);
  }
  return groups;
}

// TODO: Texte sind Platzhalter – werden durch die finalen Textbausteine ersetzt.
export const metadata: Metadata = {
  title: "Franchise-Partner gewinnen mit Videomarketing | Leadfluss",
  description:
    "Als Franchise- oder Lizenzgeber mit regionalem Videomarketing 5–10 zusätzliche Partner pro Jahr gewinnen – ohne Mehraufwand.",
};

// Platzhalter-Benefits – werden durch die finalen Textbausteine ersetzt.
const HERO_BENEFITS = [
  "Gewinne qualifizierte, wirklich passende Franchise-Interessenten",
  "Werde als attraktives Franchise-System regional sichtbar",
  "Fülle deine Pipeline planbar mit 30+ Bewerbungen pro Monat",
  "Erhalte nur Anfragen zielgenau in deinen Wunschregionen",
];

export const revalidate = 60;

export default async function FranchisePage() {
  const references = await getFranchiseReferences();

  return (
    <>
      {/* Elfsight Platform – für das Google-Reviews-Widget */}
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      {/* Hero – 1:1 nach der Startseite */}
      <section className="relative overflow-hidden" data-no-reveal>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--signal),transparent_88%),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-14 sm:px-6 sm:pt-28 sm:pb-16">
          {/* Kopfblock über volle Breite */}
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-foreground">
              Für Franchise- &amp; Lizenzsysteme, die planbar wachsen wollen.
            </p>
            <h1 className="mt-4 text-[1.51875rem] font-bold leading-[1.1] tracking-tight sm:text-[3.25rem]">
              Gewinne als Franchisegeber{" "}
              <span className="text-signal">5–10 zusätzliche Partner</span> pro
              Jahr in <span className="text-signal">deinen Wunschregionen</span>
            </h1>
            <p className="mx-auto mt-3 max-w-[49.5rem] text-[0.99rem] font-semibold leading-snug text-foreground sm:text-xl">
              Wir zeigen dir, wie du mit regionalem Videomarketing qualifizierte
              Anfragen für dein Franchise- oder Lizenzsystem gewinnst – ohne
              Mehraufwand oder lange Vorlaufzeit.
            </p>
          </div>

          {/* Zweigeteilter Abschnitt: Video links, Text + CTA rechts */}
          <div className="mt-11 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <MuxVideo
              playbackId={FRANCHISE_PLAYBACK_ID}
              title="Franchise mit Leadfluss"
              preview
            />

            {/* Text + CTA */}
            <div className="text-center lg:text-left">
              <ul className="space-y-1.5 text-left">
                {HERO_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-icon-bg text-signal">
                      <Check className="size-4" />
                    </span>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  size="lg"
                  render={
                    <Link href="/anfrage">
                      Jetzt kostenloses Erstgespräch buchen
                      <ArrowRight className="size-4" />
                    </Link>
                  }
                />
              </div>

              {/* Google Bewertungen (Elfsight) – direkt unter dem CTA */}
              <div className="mt-6 flex justify-center lg:justify-start">
                <div
                  className="elfsight-app-3b70a598-9f73-4528-87fb-305d274a75ba"
                  data-elfsight-app-lazy
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referenz-Projekte – je Firma eine eigene Sektion: Text links, Video-
          Karussell rechts. */}
      {groupByCompany(references).map((group) => {
        const content = referenceContent(group.name);
        const videoLeft = content?.videoSide === "left";
        return (
          <section
            key={group.name}
            className="border-t border-border"
            data-no-reveal
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
              {content?.sections?.length ? (
                <>
                  {/* Kopf über die volle Breite: großes Logo + Titel */}
                  <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left sm:gap-6">
                    {group.logoUrl && (
                      <Image
                        src={group.logoUrl}
                        alt={group.name}
                        width={360}
                        height={144}
                        className="h-[7.5rem] w-auto max-w-[300px] shrink-0 object-contain"
                      />
                    )}
                    {content.title && (
                      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                        {content.title}
                      </h2>
                    )}
                  </div>

                  {/* Darunter: Texte links, Video-Karussell rechts */}
                  <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    {/* Karussell: mobil direkt nach der Headline; Desktop je
                        nach videoSide links oder rechts */}
                    <div className={videoLeft ? "lg:order-1" : "lg:order-2"}>
                      <ReferenceCarousel
                        videos={orderVideos(group.name, group.videos)}
                        maxWidth={content.carouselWidth}
                      />
                    </div>
                    {/* Beschreibungen: mobil darunter; Desktop gegenüber dem Video */}
                    <div
                      className={`space-y-5 text-left ${
                        videoLeft ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      {content.sections.map((s) => (
                        <div key={s.label} className="flex gap-3.5">
                          <span
                            className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${
                              SECTION_TONE[s.tone ?? "signal"]
                            }`}
                          >
                            <s.icon className="size-5" />
                          </span>
                          <p className="text-lg leading-relaxed text-muted-foreground">
                            <span className="font-semibold text-foreground">
                              {s.label}:
                            </span>{" "}
                            {s.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Ohne Fallstudien-Text: schlicht zentriert */
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4">
                    {group.logoUrl && (
                      <Image
                        src={group.logoUrl}
                        alt={group.name}
                        width={200}
                        height={80}
                        className="h-12 w-auto max-w-[160px] object-contain"
                      />
                    )}
                    <span className="text-lg font-semibold text-foreground">
                      {group.name}
                    </span>
                  </div>
                  <div className="mt-8">
                    <ReferenceCarousel
                      videos={orderVideos(group.name, group.videos)}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Bereit, dein Franchise-System zu skalieren?
          </h2>
          <p className="mx-auto mt-4 text-lg text-primary-foreground/70">
            In einem kurzen, unverbindlichen Erstgespräch finden wir heraus, ob
            und wie wir dich bei der Gewinnung von 5–10 zusätzlichen Partnern pro
            Jahr unterstützen können.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              render={
                <Link href="/anfrage">
                  Jetzt anfragen
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
