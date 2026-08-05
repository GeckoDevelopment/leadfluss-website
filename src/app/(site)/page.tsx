import Link from "next/link";
import {
  ArrowRight,
  Target,
  MousePointerClick,
  PhoneCall,
  LineChart,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/site/post-card";
import { getPosts } from "@/sanity/lib/posts";

const SERVICES = [
  {
    icon: Target,
    title: "Zielgenaue Kampagnen",
    text: "Wir erreichen genau die Menschen in deiner Region, die deine Leistung jetzt brauchen – über Meta & Google Ads.",
  },
  {
    icon: MousePointerClick,
    title: "Landingpages, die konvertieren",
    text: "Fokussierte Seiten mit einer klaren Botschaft verwandeln Besucher in qualifizierte Anfragen.",
  },
  {
    icon: PhoneCall,
    title: "Qualifizierte Anfragen",
    text: "Keine Zeitverschwender – wir filtern vor, damit bei dir nur ernsthafte Interessenten ankommen.",
  },
  {
    icon: LineChart,
    title: "Messbare Ergebnisse",
    text: "Transparentes Reporting: Du siehst jederzeit, was dein Budget an Anfragen und Aufträgen bringt.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Analyse & Strategie",
    text: "Wir verstehen deinen Betrieb, deine Zielgruppe und dein Wunschprojekt – und leiten daraus die passende Kampagne ab.",
  },
  {
    step: "02",
    title: "Setup & Launch",
    text: "Landingpage, Anzeigen und Tracking werden aufgesetzt und live geschaltet. In wenigen Tagen startet der Anfragenfluss.",
  },
  {
    step: "03",
    title: "Optimieren & Skalieren",
    text: "Wir optimieren laufend anhand echter Zahlen und skalieren, was funktioniert – für planbar mehr Anfragen.",
  },
];

const STATS = [
  { value: "500+", label: "generierte Anfragen / Monat" },
  { value: "30 Tage", label: "bis zu den ersten Ergebnissen" },
  { value: "100 %", label: "transparentes Reporting" },
];

export default async function HomePage() {
  const posts = await getPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--signal),transparent_88%),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-2 bg-signal" />
              Leadgenerierung für Handwerk & Mittelstand
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
              Planbar neue Kunden.
              <br />
              <span className="text-signal">Ohne Auftragsflauten.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Leadfluss liefert deinem Betrieb verlässlich qualifizierte
              Anfragen – über performante Kampagnen und Landingpages, die
              konvertieren.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                render={
                  <Link href="/kontakt">
                    Termin anfragen
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
            <p className="mt-6 text-sm text-muted-foreground">
              Kostenloses Erstgespräch · Keine langfristige Bindung
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-10 text-center">
              <div className="font-heading text-4xl font-bold text-signal">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leistungen */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-signal">
            Leistungen
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Ein System, das verlässlich Anfragen liefert
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Vier Bausteine, die ineinandergreifen – für einen planbaren Zufluss
            an neuen Kunden.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="border border-border bg-card p-6 transition-colors hover:border-signal"
            >
              <span className="flex size-11 items-center justify-center bg-icon-bg text-signal">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ablauf */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-signal">
              So läuft&apos;s ab
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              In drei Schritten zum vollen Auftragsbuch
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="border border-border bg-card p-8">
                <div className="font-heading text-5xl font-bold text-signal/25">
                  {s.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warum Leadfluss */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-signal">
              Warum Leadfluss
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Marketing, das sich an Aufträgen messen lässt
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Wir reden nicht über Klicks und Reichweite, sondern über das, was
              zählt: qualifizierte Anfragen, die zu Aufträgen werden.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Spezialisiert auf Handwerk & Mittelstand",
                "Planbare Anfragen statt Zufall",
                "Transparente Zahlen – kein Blabla",
                "Persönliche Betreuung, kein Callcenter",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-signal" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button
                render={
                  <Link href="/kontakt">
                    Jetzt Erstgespräch sichern
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </div>
          <div className="border border-border bg-signal/5 p-8 sm:p-12">
            <blockquote className="text-xl font-medium leading-relaxed">
              „Innerhalb des ersten Monats hatten wir mehr qualifizierte
              Anfragen als im gesamten Quartal davor. Endlich planbar.&ldquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center bg-signal font-heading font-bold text-[color:var(--signal-foreground)]">
                MK
              </div>
              <div>
                <div className="font-semibold">Markus K.</div>
                <div className="text-sm text-muted-foreground">
                  Geschäftsführer, Dachdeckerbetrieb
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog-Teaser */}
      {posts.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-signal">
                  Aus dem Blog
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Wissen für mehr Anfragen
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

      {/* CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Bereit für planbar neue Kunden?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            Sichere dir jetzt ein kostenloses Erstgespräch und erfahre, wie viele
            Anfragen in deiner Region möglich sind.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              render={
                <Link href="/kontakt">
                  Termin anfragen
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
