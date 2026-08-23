import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Handshake,
  BadgeCheck,
  Heart,
  ClipboardList,
  CalendarDays,
  Camera,
  Film,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WistiaPlayer } from "@/components/site/wistia-player";
import { getCompanyLogos } from "@/sanity/lib/companies";

export const metadata: Metadata = {
  title: "Vor-Ort-Videodreh",
  description:
    "Der Vor-Ort-Videodreh für Fachbetriebe: hochwertige, authentische Werbefilme, die deine Wahrnehmung stärken und nachweislich mehr Kundenanfragen bringen.",
};

// Warum ein Videodreh mehr Leads bringt – drei Kernargumente.
const REASONS = [
  {
    icon: Handshake,
    title: "Vertrauen",
    text: "Wir zeigen echte Menschen, echte Arbeit und echte Stimmen – das schafft Nähe und stärkt die Kundenbindung.",
  },
  {
    icon: BadgeCheck,
    title: "Glaubwürdigkeit",
    text: "Durch authentische Einblicke in deinen Betrieb entsteht Content, der überzeugt statt zu überreden.",
  },
  {
    icon: Heart,
    title: "Emotionen",
    text: "Bilder sagen mehr als tausend Worte – wir fangen Momente ein, die berühren und im Kopf bleiben.",
  },
];

// Das Leadfluss-Konzept: der Weg vom ersten Gespräch bis zum fertigen Werbefilm.
const STEPS = [
  {
    icon: ClipboardList,
    title: "Vorbesprechung zum Video",
    text: "Wir legen gemeinsam fest, welche Angebote, Leistungen, Standorte und Personen in den Werbevideos gezeigt werden sollen, um die gewünschten Reaktionen bei deiner Zielgruppe hervorzurufen. Natürlich geben wir dir unsere Empfehlungen mit, was aus unserer Erfahrung am wichtigsten ist.",
  },
  {
    icon: CalendarDays,
    title: "Planung des Drehtags",
    text: "Unser Mediateam plant die genauen Skripte und Aufnahmen, die wir am Tag vor Ort umsetzen. Dabei beziehen wir die Identität und Philosophie deiner Firma in den Drehplan ein, damit maximal authentische Videos entstehen. Den fertigen Plan erhältst du zur Einsicht, damit du Feedback geben kannst und gut vorbereitet bist.",
  },
  {
    icon: Camera,
    title: "Vor-Ort-Videodreh",
    text: "Am jeweiligen Termin kommen wir mit unserer Kameraausrüstung und Videografen, um die Aufnahmen nach Plan zu produzieren. Ähnlich wie an einem Filmset werden die Skripte mit den einzelnen Personen vorab besprochen und anschließend abgedreht. Außerdem bewegen wir uns zwischen verschiedenen Locations, um abwechslungsreiche Eindrücke einzufangen.",
  },
  {
    icon: Film,
    title: "Produktion der Werbefilme",
    text: "Nach dem Drehtag verarbeiten unsere Videoeditoren die große Menge an Aufnahmen zu fertigen Werbevideos. Dabei achten wir besonders darauf, dass die Videos Emotionen bei deinen Zielkunden wecken, sodass diese sich tatsächlich bei dir eintragen.",
  },
  {
    icon: Megaphone,
    title: "Einsatz der fertigen Videos",
    text: "Sobald du die fertigen Filme abgesegnet hast, setzen unsere Werbeprofis sie gezielt in den Onlinekanälen ein, um neue Kundenanfragen zu gewinnen. So wird dein Unternehmen vom Zielpublikum ganz anders wahrgenommen – was sich in den Ergebnissen widerspiegelt.",
  },
];

export const revalidate = 60;

export default async function VorOrtVideodrehPage() {
  const companyLogos = await getCompanyLogos();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--signal),transparent_88%),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-signal">
            Leadfluss präsentiert
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Der Vor-Ort-Videodreh für{" "}
            <span className="text-signal">Fachbetriebe</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Verbessere die Wahrnehmung deines Unternehmens bei deiner Zielgruppe
            – mit hochwertigen Werbefilmen, die speziell für den Einsatz in
            deinen Online-Kanälen produziert werden.
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
        {/* Werbefilm (Wistia) */}
        <div className="mx-auto max-w-4xl px-4 pt-12 pb-20 sm:px-6 sm:pt-14 sm:pb-24">
          <WistiaPlayer mediaId="x1h8o61b7b" />
        </div>
      </section>

      {/* Warum ein Videodreh für mehr Leads sorgt */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Wie sorgt ein Videodreh für mehr Leads?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Menschen treffen Entscheidungen hauptsächlich emotional und
            unterbewusst. Platte, langweilige Werbung löst bei deiner Zielgruppe
            nichts aus – dein Kunde scrollt einfach weiter. Für Werbung bezahlst
            du ohnehin, entweder mit deiner Zeit oder mit Geld. Also wenn schon
            Marketing, dann gleich richtig.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.title} className="border border-border bg-card p-8">
              <span className="flex size-12 items-center justify-center bg-icon-bg text-signal">
                <r.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{r.title}</h3>
              <p className="mt-2 text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button
            size="lg"
            render={<Link href="/anfrage">Jetzt anfragen</Link>}
          />
        </div>
      </section>

      {/* Das Leadfluss Konzept – 5 Schritte */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-signal">
              Das Leadfluss Konzept
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              In 5 Schritten zu Werbefilmen, die Kunden gewinnen
            </h2>
            <p className="mx-auto mt-4 text-lg text-muted-foreground">
              Von der ersten Idee bis zum Einsatz der fertigen Videos begleiten
              wir dich durch den gesamten Prozess.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="flex flex-col gap-5 border border-border bg-card p-6 sm:flex-row sm:p-8"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-center">
                  <span className="flex size-11 shrink-0 items-center justify-center bg-signal font-heading text-lg font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden text-signal sm:mt-3 sm:block">
                    <s.icon className="size-6" />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
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

      {/* Neues Bildmaterial → neue Kundenanfragen */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mit neuem Bildmaterial zu neuen Kundenanfragen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Indem du neue, authentische Aufnahmen auf sämtlichen
              Werbeplattformen nutzt, sorgst du für mehr Glaubwürdigkeit und
              Interesse bei deinem Zielpublikum – und gewinnst nachweislich mehr
              Leads.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                render={
                  <Link href="/anfrage">
                    Jetzt Anfrage stellen
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-muted">
            <Image
              src="/hero-team.jpg"
              alt="Das Leadfluss-Team beim Vor-Ort-Videodreh"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Kundenlogos – bist du als Nächster dabei? */}
      {companyLogos.length > 0 && (
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Bist du als Nächster dabei?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Ein Ausschnitt der Unternehmen, mit denen wir bereits den
                Leadfluss-Videodrehtag umgesetzt haben. Sie alle eint der Wunsch
                zu wachsen und ihre Kundengewinnung zu verbessern.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 items-center gap-x-3 gap-y-4 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6">
              {companyLogos.map((c) => (
                <div
                  key={c._id}
                  className="flex h-12 items-center justify-center"
                >
                  <Image
                    src={c.logoUrl}
                    alt={c.name}
                    width={220}
                    height={84}
                    className="max-h-12 w-auto max-w-[80%] object-contain opacity-70 grayscale transition hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Abschluss-CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Willst du nachhaltig mehr Leads gewinnen?
          </h2>
          <p className="mx-auto mt-4 text-lg text-primary-foreground/70">
            Setze jetzt den ersten Schritt für deinen Marketing-Erfolg.
            Online-Werbung kann heute jeder – bei uns gibt es kein
            Standard-Marketing, sondern erfolgreiche Kampagnen, die wirklich
            kaufkräftige Interessenten für deinen Betrieb generieren.
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
