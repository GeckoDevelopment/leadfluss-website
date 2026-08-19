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
  title: "Style Guide",
  robots: { index: false, follow: false },
};

/* ---- Color tokens ---- */
const BRAND_COLORS = [
  { name: "Signal Green", token: "--signal", hex: "#00C281", cls: "bg-signal", fg: "text-white" },
  { name: "Signal Foreground", token: "--signal-foreground", hex: "#05271C", cls: "bg-[var(--signal-foreground)]", fg: "text-white" },
  { name: "Brand Navy", token: "--foreground", hex: "#232D44", cls: "bg-foreground", fg: "text-white" },
  { name: "Icon Surface", token: "--icon-bg", hex: "#E3F8EF", cls: "bg-icon-bg", fg: "text-signal" },
];

const NEUTRAL_COLORS = [
  { name: "Background", token: "--background", cls: "bg-background", fg: "text-foreground", border: true },
  { name: "Card", token: "--card", cls: "bg-card", fg: "text-foreground", border: true },
  { name: "Muted", token: "--muted", cls: "bg-muted", fg: "text-foreground" },
  { name: "Muted Foreground", token: "--muted-foreground", cls: "bg-muted-foreground", fg: "text-white" },
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
      {/* Header */}
      <header>
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to site
          </Link>
        </div>
        <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-5xl">
          Style Guide
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          The design system of the Leadfluss website: a light theme, signal
          green, and a deliberately edgy component style (radius 0).
        </p>
      </header>

      {/* Logo */}
      <Section
        id="logo"
        title="Logo"
        description="The official wordmark: green double wave plus lettering in brand navy. Use the light variant on dark surfaces."
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

      {/* Colors */}
      <Section
        id="colors"
        title="Colors"
        description="All colors live as CSS variables in globals.css. Green is the signal color for CTAs and accents, navy is the text color."
      >
        <h3 className="mb-4 text-lg font-semibold">Brand colors</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_COLORS.map((c) => (
            <ColorSwatch key={c.token} {...c} />
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-lg font-semibold">
          Neutral &amp; semantic colors
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEUTRAL_COLORS.map((c) => (
            <ColorSwatch key={c.token} {...c} />
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section
        id="typography"
        title="Typography"
        description="Jost across the entire site – headlines and body text."
      >
        <div className="space-y-6 border border-border bg-card p-8">
          <div>
            <span className="text-xs text-muted-foreground">
              font-heading · Jost · H1
            </span>
            <p className="font-heading text-5xl font-bold tracking-tight">
              Predictable new customers
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">
              font-heading · Jost · H2
            </span>
            <p className="font-heading text-3xl font-bold tracking-tight">
              Become number one with video marketing
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">
              font-heading · Jost · H3
            </span>
            <p className="font-heading text-xl font-semibold">
              A system that delivers enquiries
            </p>
          </div>
          <Separator />
          <div>
            <span className="text-xs text-muted-foreground">
              font-sans · Jost · Body (large)
            </span>
            <p className="text-lg text-muted-foreground">
              Professional promotional videos make your offer more appealing to
              new customers and your jobs more attractive to employees.
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">
              font-sans · Jost · Body
            </span>
            <p className="text-foreground/90">
              We don&apos;t talk about clicks and reach, but about what counts:
              qualified enquiries that turn into orders.
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Small / Muted</span>
            <p className="text-sm text-muted-foreground">
              Free initial consultation · No long-term commitment
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Eyebrow / Label</span>
            <p className="text-sm font-semibold uppercase tracking-wider text-signal">
              Services
            </p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section
        id="buttons"
        title="Buttons"
        description="Edgy (no rounding), white text on signal green. Variants and sizes."
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
              Request now
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline">
              <Play className="size-4" />
              Watch video
            </Button>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section id="badges" title="Badges">
        <div className="flex flex-wrap items-center gap-4 border border-border bg-card p-8">
          <Badge className="bg-signal/12 text-[color:var(--signal-foreground)]">
            Photovoltaics
          </Badge>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge className="bg-signal text-white">
            <Star className="size-3" />
            Top rating
          </Badge>
        </div>
      </Section>

      {/* Form elements */}
      <Section id="forms" title="Form elements">
        <div className="grid gap-6 border border-border bg-card p-8 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sg-name">Name</Label>
            <Input id="sg-name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sg-mail">Email</Label>
            <Input id="sg-mail" type="email" placeholder="john@company.com" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="sg-msg">Message</Label>
            <Textarea id="sg-msg" rows={3} placeholder="Your message …" />
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section
        id="cards"
        title="Cards"
        description="Surfaces with a thin border, edgy, green hover accent."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="border border-border bg-card p-6 transition-colors hover:border-signal">
            <span className="flex size-11 items-center justify-center bg-icon-bg text-signal">
              <Check className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">Feature card</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Green icon surface, title, description.
            </p>
          </div>
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Mail className="size-3.5 text-signal" />
              Speyer · Photovoltaics
            </div>
            <h3 className="mt-3 text-lg font-semibold">Case study card</h3>
            <div className="mt-4 border-t border-border pt-3">
              <div className="font-heading text-xl font-bold text-signal">
                50+ leads / month
              </div>
            </div>
          </div>
          <div className="border border-border bg-signal/5 p-6">
            <blockquote className="font-medium">
              &ldquo;Finally predictable new enquiries.&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-signal font-heading text-sm font-bold text-white">
                MK
              </div>
              <div className="text-sm">
                <div className="font-semibold">Markus K.</div>
                <div className="text-muted-foreground">Roofing company</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section
        id="principles"
        title="Design principles"
        description="The rules that define the look."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Edgy (radius 0)</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All corners are square – <code>--radius: 0</code>. Even
              <code> rounded-full</code> is globally overridden to square.
              Exception: portraits (<code>.avatar-round</code>).
            </p>
            <div className="mt-4 flex gap-3">
              <div className="size-12 bg-signal" />
              <div className="size-12 bg-foreground" />
              <div className="size-12 border border-border bg-muted" />
            </div>
          </div>
          <div className="border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Green as a signal</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Green is reserved for actions and accents (CTAs, highlights,
              icons). Body text stays navy, surfaces stay light and calm.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Button size="sm">CTA</Button>
              <span className="text-sm text-signal">Accent link</span>
            </div>
          </div>
        </div>
      </Section>

      <p className="mt-14 border-t border-border pt-8 text-sm text-muted-foreground">
        This style guide uses the same tokens and components as the website, so
        it always stays up to date.
      </p>
    </div>
  );
}
