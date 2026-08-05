import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  TrendingDown,
  Users,
  ShieldAlert,
  Wallet,
  LineChart,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/site/post-card";
import { getPosts } from "@/sanity/lib/posts";

const CHALLENGES = [
  {
    icon: TrendingDown,
    text: "Der Preiskampf wird größer und die Margen werden immer kleiner.",
  },
  {
    icon: Users,
    text: "Du möchtest gern Aufträge annehmen, aber dir fehlen die richtigen Mitarbeiter.",
  },
  {
    icon: ShieldAlert,
    text: "Du hast oft Angst, von deiner Konkurrenz abgehängt zu werden.",
  },
  {
    icon: Wallet,
    text: "Interessenten wollen sich nur informieren oder haben kein Budget.",
  },
  {
    icon: LineChart,
    text: "Die Auftragslage verschlechtert sich spürbar.",
  },
];

const CASES = [
  {
    name: "SoNachhaltig GmbH",
    role: "Regionaler Solarfachbetrieb",
    location: "Speyer",
    category: "Photovoltaik",
    text: "Für den regionalen Fachbetrieb SoNachhaltig generieren wir pro Monat über 50 Solar Leads zusätzlich über Videomarketing und Brandingkampagnen.",
    result: "50+ Leads pro Monat zusätzlich",
  },
  {
    name: "Solarzentrum Rheingau",
    role: "Regionaler PV-Fachbetrieb",
    location: "Rheingau-Taunus Kreis",
    category: "Photovoltaik",
    text: "Durch unsere Online-Strategien gewinnt das Solarzentrum Rheingau seit 2024 verlässlich monatlich 30 zusätzliche qualifizierte Interessenten.",
    result: "30+ Leads pro Monat",
  },
  {
    name: "Commodus GmbH",
    role: "Dienstleister für barrierefreie Bäder",
    location: "Krefeld",
    category: "Barrierefreie Bäder",
    text: 'Speziell für das Thema „Wanne zu Dusche in 24 Stunden" generieren wir für die Firma Commodus GmbH aus Krefeld über 200 Leads pro Monat. Auch sorgen die produzierten Kundeninterviews für bessere Abschlussquoten.',
    result: "200 Leads pro Monat",
  },
  {
    name: "Attendorner Dachtechnik",
    role: "Dachdeckerbetrieb aus Attendorn",
    location: "Attendorn (Sauerland)",
    category: "Dachsanierung und PV",
    text: "Zusammen mit Inhaber Janik Bauer haben wir einen stetigen Leadfluss von 40+ Leads pro Monat aufgebaut, dank authentischen Einblicken von Baustellen und Kundenstimmen-Videos.",
    result: "40 Leads pro Monat",
  },
  {
    name: "Viterma Neustadt",
    role: "Luxus Vollbadsanierung",
    location: "Neustadt a. d. Weinstraße",
    category: "Vollbadsanierung",
    text: "Mit dem Viterma Standort aus der Pfalz haben wir gemeinsam eine Videomarketing-Strategie entwickelt, mit der kaufwillige Hausbesitzer auf den Badanbieter aus Neustadt aufmerksam werden und direkt ihre Anfrage stellen können.",
    result: "80 Leads pro Monat",
  },
  {
    name: "Energietechnik Schermuly",
    role: "Photovoltaik Fachbetrieb aus Gießen",
    location: "Gießen",
    category: "Photovoltaik",
    text: "Zuvor hat die Gießener Solarfirma ihre Aufträge nur über Empfehlungen und Google gewonnen. Das haben wir innerhalb von nur 14 Tagen geändert. Sobald ein Eigenheimbesitzer in Hessen über eine Solaranlage nachdenkt, bekommt er Anzeigen von Energietechnik Schermuly präsentiert.",
    result: "50 Leads pro Monat",
  },
];

const TEAM = [
  { name: "Armin Hirschfeld", role: "Strategieberater" },
  { name: "Peer Joeressen", role: "Kundenbetreuer" },
  { name: "Jonas Gernhardt", role: "Videoproduzent" },
  { name: "Anna Kischkat", role: "Marketing Expertin" },
  { name: "Daniel Kreutzer", role: "Expansion Advisor" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export default async function HomePage() {
  const posts = await getPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--signal),transparent_88%),transparent)]" />
        {/* Großes Logo-Icon als dezentes Hintergrund-Design */}
        <Image
          src="/leadfluss-mark.png"
          alt=""
          aria-hidden
          width={515}
          height={515}
          priority
          className="pointer-events-none absolute left-1/2 top-[46%] -z-10 w-[420px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06] select-none sm:w-[620px]"
        />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
              Mit Videomarketing zur{" "}
              <span className="text-signal">Nummer 1 in deiner Branche</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Dank professionellen Werbevideos wird dein Angebot interessanter
              für Neukunden und deine Arbeitsplätze attraktiver für Mitarbeiter.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                render={
                  <Link href="/kontakt">
                    Jetzt kostenlose Anfrage stellen
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/fallstudien">Fallstudien ansehen</Link>}
              />
            </div>
          </div>

          {/* Werbefilm (Wistia) */}
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <iframe
                src="https://fast.wistia.net/embed/iframe/x1h8o61b7b?seo=true&videoFoam=false"
                title="Leadfluss Werbefilm"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          {/* 75+ Partnerbetriebe */}
          <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-4 border border-border bg-card p-8 text-center sm:flex-row sm:text-left">
            <div className="font-heading text-5xl font-bold text-signal">
              75+
            </div>
            <div>
              <div className="font-semibold">Partnerbetriebe</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Aktuell helfen wir über 75 Partnerfirmen im Mittelstand bei der
                Vermarktung durch Werbevideos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Herausforderungen */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Steht dein Unternehmen auch vor diesen Herausforderungen?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHALLENGES.map((c) => (
              <div
                key={c.text}
                className="flex gap-4 border border-border bg-card p-6"
              >
                <span className="flex size-11 shrink-0 items-center justify-center bg-icon-bg text-signal">
                  <c.icon className="size-5" />
                </span>
                <p className="text-foreground/90">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ergebnisse / Fallstudien */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-signal">
            Ergebnisse
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Lassen wir Ergebnisse sprechen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            So beschreiben Kunden die Zusammenarbeit mit Leadfluss.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <div
              key={c.name}
              className="flex flex-col border border-border bg-card p-6"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <MapPin className="size-3.5 text-signal" />
                {c.location} · {c.category}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{c.name}</h3>
              <div className="text-sm text-muted-foreground">{c.role}</div>
              <p className="mt-3 flex-1 text-sm text-foreground/90">{c.text}</p>
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
      </section>

      {/* Team */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Das Team, das dein Unternehmen versteht und sichtbar macht
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hinter Leadfluss steht ein Team aus Experten, das die Sprache des
              Mittelstands spricht und hochwertige Werbevideos mit digitalem
              Marketing verbindet. Seit der Gründung im Jahr 2022 haben wir uns
              in über 100 Projekten bewiesen.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="flex flex-col items-center border border-border bg-card p-6 text-center"
              >
                <div className="flex size-16 items-center justify-center bg-signal font-heading text-lg font-bold text-[color:var(--signal-foreground)]">
                  {initials(m.name)}
                </div>
                <div className="mt-4 font-semibold">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standort Leipzig */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-signal">
              Unser Standort
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Unser Standort in Leipzig
            </h2>
            <div className="mt-4 space-y-4 text-lg text-muted-foreground">
              <p>
                Unser Hauptstandort befindet sich in der Messestadt Leipzig. Aus
                unserem Büro heraus werden die deutschlandweiten Videodrehs
                unserer Kunden koordiniert und die Marketingkampagnen verwaltet.
              </p>
              <p>
                Für unsere Partnerfirmen sind wir wöchentlich auf Tour, um vor
                Ort bei den Betrieben authentische Aufnahmen für die
                Videokampagnen zu produzieren.
              </p>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                render={
                  <Link href="/kontakt">
                    Leadfluss kostenlos anfragen
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-center border border-border bg-signal/5 p-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <MapPin className="size-10 text-signal" />
              <div className="font-heading text-2xl font-bold">Leipzig</div>
              <div className="text-sm text-muted-foreground">
                Deutschlandweit im Einsatz
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rezensionen (Google, via Elfsight) */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-signal">
              Rezensionen
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Rezensionen, die für Leadfluss sprechen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Im Laufe der letzten Jahre durften wir eng mit dutzenden
              Unternehmen aus dem Mittelstand zusammenarbeiten. Hier teilen
              einige ihre persönliche Erfahrung in der Zusammenarbeit mit uns.
              Überzeuge dich selbst.
            </p>
          </div>
          {/* Elfsight platform.js einmal laden – bedient beide Widgets. */}
          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="afterInteractive"
          />
          {/* Zusammenfassung: Bewertungsschnitt + Anzahl */}
          <div className="mt-10">
            <div
              className="elfsight-app-3b70a598-9f73-4528-87fb-305d274a75ba"
              data-elfsight-app-lazy=""
            />
          </div>
          {/* Letzte positive Rezensionen */}
          <div className="mt-8">
            <div
              className="elfsight-app-5f36dae6-b272-4162-b8ea-0cd8a57ce074"
              data-elfsight-app-lazy=""
            />
          </div>
        </div>
      </section>

      {/* Blog-Teaser */}
      {posts.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-signal">
                  Aus dem Blog
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Wissen für mehr Sichtbarkeit
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline"
              >
                Alle Artikel
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Kontakt / CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Kontaktiere uns jetzt!
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/70">
                Wir sind unter der Woche erreichbar über Telefon und E-Mail.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  render={
                    <Link href="/kontakt">
                      Jetzt Anfrage senden
                      <ArrowRight className="size-4" />
                    </Link>
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
              <div className="flex items-center gap-4 border border-white/15 p-5">
                <Clock className="size-5 shrink-0 text-signal" />
                <div>
                  <div className="text-sm text-primary-foreground/60">
                    Geschäftszeiten
                  </div>
                  <div className="font-medium">Mo–Fr, 8:00 bis 18:00 Uhr</div>
                </div>
              </div>
              <a
                href="mailto:info@leadfluss.de"
                className="flex items-center gap-4 border border-white/15 p-5 transition-colors hover:border-signal"
              >
                <Mail className="size-5 shrink-0 text-signal" />
                <div>
                  <div className="text-sm text-primary-foreground/60">
                    E-Mail
                  </div>
                  <div className="font-medium">info@leadfluss.de</div>
                </div>
              </a>
              <a
                href="tel:+4934160823338"
                className="flex items-center gap-4 border border-white/15 p-5 transition-colors hover:border-signal"
              >
                <Phone className="size-5 shrink-0 text-signal" />
                <div>
                  <div className="text-sm text-primary-foreground/60">
                    Telefon
                  </div>
                  <div className="font-medium">+49 341 60823338</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
