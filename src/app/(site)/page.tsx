import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Check,
  ThumbsDown,
  Activity,
  TrendingDown,
  UserX,
  Sparkles,
  CalendarCheck,
  Filter,
  Magnet,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/site/post-card";
import Image from "next/image";
import { getPosts } from "@/sanity/lib/posts";
import { getTeam } from "@/sanity/lib/team";
import { getCaseStudies } from "@/sanity/lib/case-studies";

const HERO_BENEFITS = [
  "Mache dich unabhängig von der schlechten Qualität der Leads über Portale und Leadhändler",
  "Stabilisiere deine schwankende Auftragslage und werde Monate im Voraus ausgebucht",
  "Suche dir die besten Aufträge aus, mit denen du die beste Marge verdienen kannst",
  "Besetze deine wichtigsten Stellen, indem du als Top-Arbeitgeber regional hervorstichst",
];

type CompareItem = {
  icon: typeof ThumbsDown;
  title: string;
  text: string;
  bg?: string;
};

// Gegenüberstellung: je Zeile links das Problem, rechts die passende Lösung.
// Die Lösungs-Hintergründe (bg) werden noch nachgereicht → aktuell Platzhalter.
const COMPARISON: { problem: CompareItem; solution: CompareItem }[] = [
  {
    problem: {
      icon: ThumbsDown,
      title: "Schlechte Leadqualität bei Portalen",
      text: "Du erhältst Leads, bei denen vor dir schon fünf andere angerufen haben.",
      bg: "/problems/leadqualitaet.png",
    },
    solution: {
      icon: Sparkles,
      title: "System für exklusive & vorqualifizierte Leads",
      text: "Du wirst die erste Anlaufstelle für zahlungskräftige Kunden in deiner Region.",
      bg: "/solutions/leads.png",
    },
  },
  {
    problem: {
      icon: Activity,
      title: "Auftragslage schwankt ständig",
      text: "Mal laufen dir die Kunden die Tür ein, mal wochenlang niemand.",
      bg: "/problems/auftragslage.png",
    },
    solution: {
      icon: CalendarCheck,
      title: "Planbare und konstante Auftragsgewinnung",
      text: "Mit unserem System bist du dauerhaft Monate im Voraus ausgebucht.",
      bg: "/solutions/auftraege.png",
    },
  },
  {
    problem: {
      icon: TrendingDown,
      title: "Aufträge kommen, aber schlechte Marge",
      text: "Du erhältst zwar regelmäßig Aufträge, aber verdienst effektiv kein Geld.",
      bg: "/problems/marge.png",
    },
    solution: {
      icon: Filter,
      title: "Filterprozess für Hochpreiskunden",
      text: "Erlaube es dir aufgrund der erhöhten Nachfrage, nur lukrative Projekte anzunehmen.",
      bg: "/solutions/hochpreis.png",
    },
  },
  {
    problem: {
      icon: UserX,
      title: "Unbesetzte Stellen im Unternehmen",
      text: "Schlüsselrollen bleiben bei dir unbesetzt, weil passende Kandidaten fehlen.",
      bg: "/problems/personal.png",
    },
    solution: {
      icon: Magnet,
      title: "Firmeninterner Fachkräfte-Magnet",
      text: "Stelle regelmäßig neue Fachkräfte in Schlüsselpositionen ein, die langfristig bleiben.",
      bg: "/solutions/fachkraefte.png",
    },
  },
];

function ComparisonCard({
  item,
  variant,
}: {
  item: CompareItem;
  variant: "problem" | "solution";
}) {
  const isProblem = variant === "problem";
  const accentBorder = isProblem ? "border-l-red-500" : "border-l-signal";
  const iconBg = isProblem ? "bg-red-600" : "bg-signal";
  return (
    <div
      className={`relative flex min-h-56 items-start gap-4 overflow-hidden border border-border border-l-4 ${accentBorder} bg-neutral-900 p-7`}
    >
      {item.bg && (
        <Image
          src={item.bg}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="pointer-events-none absolute inset-0 z-0 object-cover"
        />
      )}
      {/* Schwarzes Overlay für Lesbarkeit der weißen Schrift */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/65" />
      <div className="relative z-10 flex items-start gap-4">
        <span
          className={`flex size-12 shrink-0 items-center justify-center text-white ${iconBg}`}
        >
          <item.icon className="size-6" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-1.5 text-lg text-white/80">{item.text}</p>
        </div>
      </div>
    </div>
  );
}

const SOLUTIONS = [
  {
    title: "Kaufkräftige Kunden gewinnen",
    text: "Wir machen dich in deiner Region online so bekannt, dass sich kaufbereite Interessenten von selbst bei dir melden. Das Budget klären wir vorab – damit du dich nur noch um die lukrativen Aufträge kümmerst.",
    notif: {
      app: "Leadfluss · Webseiten-Formular",
      body: "Neue Anfrage für ein Terrassendach · Budget 32.000 €",
    },
  },
  {
    title: "Passende Fachkräfte finden",
    text: "Mit unserer RVM Methode wirst du lokal als attraktiver Arbeitgeber wahrgenommen, sodass du selbst schwierige Stellen wie Dachdecker, Elektriker oder Heizungsmonteure besetzen wirst.",
    notif: {
      app: "Leadfluss · Karriere-Seite",
      body: "Neue Bewerbung · Elektriker (7 Jahre Erfahrung)",
    },
  },
  {
    title: "Regionale Bekanntheit",
    text: "Wir sorgen dafür, dass du systematisch in deiner Region als bester Anbieter für deine Produktkategorie angesehen wirst, sodass die hochwertigsten Kunden als allererstes bei dir anfragen.",
    notif: {
      app: "Leadfluss · Webseiten-Formular",
      body: "Neue Anfrage über die Webseite für eine Haustür",
    },
  },
];

function NotificationCard({ app, body }: { app: string; body: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[18px] bg-muted p-4 shadow-sm ring-1 ring-black/5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-signal text-white">
        <MessageSquare className="size-6" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold text-foreground">
            {app}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">jetzt</span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export const revalidate = 60;

export default async function HomePage() {
  const [posts, team, caseStudies] = await Promise.all([
    getPosts(3),
    getTeam(),
    getCaseStudies(),
  ]);

  return (
    <>
      {/* Elfsight Platform – einmal für alle Google-Reviews-Widgets */}
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--signal),transparent_88%),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          {/* Kopfblock über volle Breite */}
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-foreground">
              Branchenpartner für Photovoltaik, Badsanierung, Treppenlifte und
              Bauelemente
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-[3.25rem]">
              Die finale Lösung für{" "}
              <span className="text-signal">planbar mehr Aufträge</span> und
              qualifiziertes Personal als Handwerksbetrieb
            </h1>
            <p className="mx-auto mt-3 max-w-[49.5rem] text-lg font-semibold leading-snug text-foreground sm:text-xl">
              In 4 Wochen implementieren wir einen neuen Weg für täglich neue
              Anfragen und Bewerbungen, um weiter zu wachsen, ohne das
              Tagesgeschäft zu vernachlässigen.
            </p>
          </div>

          {/* Zweigeteilter Abschnitt: Video links, Text + CTA rechts */}
          <div className="mt-11 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Werbefilm (Wistia) */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <iframe
                src="https://fast.wistia.net/embed/iframe/x1h8o61b7b?seo=true&videoFoam=false"
                title="Leadfluss Werbefilm"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

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
                    <Link href="/kontakt">
                      Jetzt kostenlose Anfrage stellen
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

      {/* Lösung */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Willst du auch täglich solche Anfragen bekommen?
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-5xl space-y-16">
            {SOLUTIONS.map((s, i) => {
              const notifFirst = i % 2 === 1; // 2. Reihe: Benachrichtigung links
              return (
                <div
                  key={s.title}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
                >
                  <div className={notifFirst ? "md:order-2" : undefined}>
                    <h3 className="text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-lg text-muted-foreground">
                      {s.text}
                    </p>
                  </div>
                  <div className={notifFirst ? "md:order-1" : undefined}>
                    <NotificationCard {...s.notif} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Google Reviews (Elfsight) */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Das sagen unsere Kunden
            </h2>
            <p className="mx-auto mt-4 text-lg text-muted-foreground">
              Echte Google-Bewertungen aus über 75 Partnerbetrieben.
            </p>
          </div>
          <div className="mt-12">
            <div
              className="elfsight-app-5f36dae6-b272-4162-b8ea-0cd8a57ce074"
              data-elfsight-app-lazy
            />
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
          {caseStudies.map((c) => (
            <div
              key={c._id}
              className="flex flex-col border border-border bg-card p-6"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <MapPin className="size-3.5 text-signal" />
                {c.location} · {c.branch}
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
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((m) => (
              <div
                key={m._id}
                className="border border-border bg-card"
              >
                {m.imageUrl ? (
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    <Image
                      src={m.imageUrl}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-signal font-heading text-4xl font-bold text-white">
                    {initials(m.name)}
                  </div>
                )}
                <div className="p-4 text-center">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gegenüberstellung: Problem → Lösung */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Diese Probleme lösen wir für dich
            </h2>
          </div>

          {/* Spaltenüberschriften (nur Desktop) */}
          <div className="mt-12 hidden grid-cols-[1fr_2.5rem_1fr] gap-4 md:grid">
            <div className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Das Problem
            </div>
            <div />
            <div className="text-sm font-semibold uppercase tracking-wider text-signal">
              Unsere Lösung
            </div>
          </div>

          <div className="mt-4 space-y-6">
            {COMPARISON.map((row) => (
              <div
                key={row.problem.title}
                className="grid items-stretch gap-4 md:grid-cols-[1fr_2.5rem_1fr]"
              >
                <ComparisonCard item={row.problem} variant="problem" />
                <div className="flex items-center justify-center text-signal">
                  <ArrowRight className="size-6 rotate-90 md:rotate-0" />
                </div>
                <ComparisonCard item={row.solution} variant="solution" />
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
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-muted">
            <Image
              src="/leipzig.webp"
              alt="Leipzig aus der Vogelperspektive mit dem Neuen Rathaus"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
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
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Links: hochkant-Karte */}
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/15 bg-white/5">
              <iframe
                src="https://maps.google.com/maps?q=Leadfluss+Leipzig&t=m&z=15&output=embed&iwloc=near"
                title="Leadfluss Standort Leipzig"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
              />
            </div>

            {/* Rechts: Text + Button, darunter die Infos */}
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
              <div className="mt-8 grid gap-4">
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
        </div>
      </section>
    </>
  );
}
