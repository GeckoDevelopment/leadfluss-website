import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Star, Play, Mail } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ColorSwatch } from "./color-swatch";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/* ---- Farb-Tokens ---- */
const BRAND_COLORS = [
  { name: "Signal-Grün", token: "--signal", hex: "#00C281", cls: "bg-signal", fg: "text-white" },
  { name: "Signal-Foreground", token: "--signal-foreground", hex: "#05271C", cls: "bg-[var(--signal-foreground)]", fg: "text-white" },
  { name: "Marken-Navy", token: "--foreground", hex: "#232D44", cls: "bg-foreground", fg: "text-white" },
  { name: "Icon-Fläche", token: "--icon-bg", hex: "#E3F8EF", cls: "bg-icon-bg", fg: "text-signal" },
];

const NEUTRAL_COLORS = [
  { name: "Background", token: "--background", cls: "bg-background", fg: "text-foreground", border: true },
  { name: "Card", token: "--card", cls: "bg-card", fg: "text-foreground", border: true },
  { name: "Muted", token: "--muted", cls: "bg-muted", fg: "text-foreground" },
  { name: "Muted-Foreground", token: "--muted-foreground", cls: "bg-muted-foreground", fg: "text-white" },
  { name: "Secondary", token: "--secondary", cls: "bg-secondary", fg: "text-secondary-foreground" },
  { name: "Border", token: "--border", cls: "bg-border", fg: "text-foreground" },
  { name: "Primary", token: "--primary", cls: "bg-primary", fg: "text-primary-foreground" },
  { name: "Destructive", token: "--destructive", cls: "bg-destructive", fg: "text-white" },
];

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-14">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-signal">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Kopf */}
      <header>
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Zur Website
          </Link>
        </div>
        <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-5xl">
          Styleguide
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Das Design-System der Leadfluss-Website: helles Design, Signal-Grün
          und ein bewusst kantiger Komponenten-Stil (Radius 0).
        </p>
      </header>

      {/* Logo */}
      <Section
        id="logo"
        title="Logo"
        description="Die offizielle Wortmarke: grüne Doppelwelle plus Schriftzug in Marken-Navy. Auf dunklen Flächen die helle Variante nutzen."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-center justify-center border border-border bg-card p-10">
            <Logo className="h-12" />
          </div>
          <div className="flex items-center justify-center border border-border bg-primary p-10">
            <Logo variant="light" className="h-12" />
          </div>
        </div>
      </Section>

      {/* Farben */}
      <Section
        id="farben"
        title="Farben"
        description="Alle Farben liegen als CSS-Variablen in globals.css. Grün ist die Signalfarbe für CTAs und Akzente, Navy die Textfarbe."
      >
        <h3 className="mb-4 text-lg font-semibold">Markenfarben</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_COLORS.map((c) => (
            <ColorSwatch key={c.token} {...c} />
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-lg font-semibold">Neutrale & semantische Farben</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEUTRAL_COLORS.map((c) => (
            <ColorSwatch key={c.token} {...c} />
          ))}
        </div>
      </Section>

      {/* Typografie */}
      <Section
        id="typografie"
        title="Typografie"
        description="Jost für die gesamte Website – Headlines und Fließtext."
      >
        <div className="space-y-6 border border-border bg-card p-8">
          <div>
            <span className="text-xs text-muted-foreground">
              font-heading · Jost · H1
            </span>
            <p className="font-heading text-5xl font-bold tracking-tight">
              Planbar neue Kunden
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">
              font-heading · Jost · H2
            </span>
            <p className="font-heading text-3xl font-bold tracking-tight">
              Mit Videomarketing zur Nummer 1
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">
              font-heading · Jost · H3
            </span>
            <p className="font-heading text-xl font-semibold">
              Ein System, das Anfragen liefert
            </p>
          </div>
          <Separator />
          <div>
            <span className="text-xs text-muted-foreground">
              font-sans · Jost · Body (large)
            </span>
            <p className="text-lg text-muted-foreground">
              Dank professionellen Werbevideos wird dein Angebot interessanter
              für Neukunden und deine Arbeitsplätze attraktiver für Mitarbeiter.
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">
              font-sans · Jost · Body
            </span>
            <p className="text-foreground/90">
              Wir reden nicht über Klicks und Reichweite, sondern über das, was
              zählt: qualifizierte Anfragen, die zu Aufträgen werden.
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Small / Muted</span>
            <p className="text-sm text-muted-foreground">
              Kostenloses Erstgespräch · Keine langfristige Bindung
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Eyebrow / Label</span>
            <p className="text-sm font-semibold uppercase tracking-wider text-signal">
              Leistungen
            </p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section
        id="buttons"
        title="Buttons"
        description="Kantig (kein Rundung), weiße Schrift auf Signal-Grün. Varianten und Größen."
      >
        <div className="space-y-8 border border-border bg-card p-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon">
              <ArrowRight />
            </Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-4">
            <Button>
              Jetzt anfragen
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline">
              <Play className="size-4" />
              Video ansehen
            </Button>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section id="badges" title="Badges">
        <div className="flex flex-wrap items-center gap-4 border border-border bg-card p-8">
          <Badge className="bg-signal/12 text-[color:var(--signal-foreground)]">
            Photovoltaik
          </Badge>
          <Badge>Standard</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge className="bg-signal text-white">
            <Star className="size-3" />
            Top-Bewertung
          </Badge>
        </div>
      </Section>

      {/* Formularelemente */}
      <Section id="formulare" title="Formularelemente">
        <div className="grid gap-6 border border-border bg-card p-8 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sg-name">Name</Label>
            <Input id="sg-name" placeholder="Max Mustermann" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sg-mail">E-Mail</Label>
            <Input id="sg-mail" type="email" placeholder="max@betrieb.de" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="sg-msg">Nachricht</Label>
            <Textarea id="sg-msg" rows={3} placeholder="Deine Nachricht …" />
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section
        id="cards"
        title="Cards"
        description="Flächen mit dünner Border, kantig, Hover-Akzent in Grün."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="border border-border bg-card p-6 transition-colors hover:border-signal">
            <span className="flex size-11 items-center justify-center bg-icon-bg text-signal">
              <Check className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">Feature-Card</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Icon-Fläche in Grün, Titel, Beschreibung.
            </p>
          </div>
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Mail className="size-3.5 text-signal" />
              Speyer · Photovoltaik
            </div>
            <h3 className="mt-3 text-lg font-semibold">Fallstudien-Card</h3>
            <div className="mt-4 border-t border-border pt-3">
              <div className="font-heading text-xl font-bold text-signal">
                50+ Leads / Monat
              </div>
            </div>
          </div>
          <div className="border border-border bg-signal/5 p-6">
            <blockquote className="font-medium">
              „Endlich planbar neue Anfragen."
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-signal font-heading text-sm font-bold text-white">
                MK
              </div>
              <div className="text-sm">
                <div className="font-semibold">Markus K.</div>
                <div className="text-muted-foreground">Dachdeckerbetrieb</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Prinzipien */}
      <Section
        id="prinzipien"
        title="Design-Prinzipien"
        description="Die Regeln, die den Look ausmachen."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Kantig (Radius 0)</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Alle Ecken sind rechtwinklig – <code>--radius: 0</code>. Selbst
              <code> rounded-full</code> wird global auf eckig überschrieben.
              Ausnahme: Porträts (<code>.avatar-round</code>).
            </p>
            <div className="mt-4 flex gap-3">
              <div className="size-12 bg-signal" />
              <div className="size-12 bg-foreground" />
              <div className="size-12 border border-border bg-muted" />
            </div>
          </div>
          <div className="border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Grün als Signal</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Grün ist reserviert für Aktionen und Akzente (CTAs, Highlights,
              Icons). Fließtext bleibt Navy, Flächen bleiben hell und ruhig.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Button size="sm">CTA</Button>
              <span className="text-sm text-signal">Akzent-Link</span>
            </div>
          </div>
        </div>
      </Section>

      <p className="mt-14 border-t border-border pt-8 text-sm text-muted-foreground">
        Dieser Styleguide nutzt dieselben Tokens und Komponenten wie die Website
        und bleibt damit automatisch aktuell.
      </p>
    </div>
  );
}
