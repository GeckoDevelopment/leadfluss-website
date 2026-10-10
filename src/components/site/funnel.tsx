"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Wrench,
  Handshake,
  Package,
  Users,
  Smartphone,
  Clock,
  TrendingUp,
  Scale,
  HelpCircle,
  Sprout,
  BarChart3,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackMetaEvent } from "@/lib/meta-track";

type Option = { label: string; icon?: LucideIcon };

type Step =
  | {
      id: string;
      type: "choice";
      lead: string;
      highlight: string;
      options: Option[];
    }
  | {
      id: string;
      type: "input";
      lead: string;
      highlight: string;
      placeholder: string;
      cta: string;
    }
  | {
      id: string;
      type: "contact";
      lead: string;
      highlight: string;
      subtitle: string;
    };

// Aufbau 1:1 nach dem bisherigen Anfrage-Formular: Auswahlfragen mit Icon-
// Karten (bzw. Pills, wo es keine Icons gibt), ein Freitext-Schritt und zuletzt
// der Kontaktblock.
const STEPS: Step[] = [
  {
    id: "betrieb",
    type: "choice",
    lead: "Welche Art von",
    highlight: "Betrieb bist du?",
    options: [
      { label: "Fachbetrieb", icon: Wrench },
      { label: "Vertriebsfirma", icon: Handshake },
      { label: "Händler / Hersteller", icon: Package },
      { label: "Etwas anderes", icon: HelpCircle },
    ],
  },
  {
    id: "auftraege",
    type: "choice",
    lead: "Wie viele Aufträge schließt du aktuell",
    highlight: "pro Monat ab (im Schnitt)?",
    options: [
      { label: "Weniger als 10", icon: Sprout },
      { label: "11 bis 20", icon: TrendingUp },
      { label: "21 bis 50", icon: BarChart3 },
      { label: "mehr als 50", icon: Rocket },
    ],
  },
  {
    id: "problem",
    type: "choice",
    lead: "Was ist dein aktuell",
    highlight: "größtes Problem?",
    options: [
      { label: "Zu wenig Kundenanfragen", icon: Users },
      { label: "Schlechte Anfragenqualität", icon: Smartphone },
      { label: "Keine Zeit für Marketing", icon: Clock },
      { label: "Etwas anderes", icon: HelpCircle },
    ],
  },
  {
    id: "ziel",
    type: "choice",
    lead: "Was ist dein",
    highlight: "unternehmerisches Ziel?",
    options: [
      { label: "Wachstum", icon: TrendingUp },
      { label: "Stabilität", icon: Scale },
      { label: "Höhere Abschlussrate", icon: Handshake },
      { label: "Etwas anderes", icon: HelpCircle },
    ],
  },
  {
    id: "angebot",
    type: "input",
    lead: "Was bietest du",
    highlight: "genau an?",
    placeholder: "Geben Sie hier ein …",
    cta: "Weiter",
  },
  {
    id: "kontakt",
    type: "contact",
    lead: "Wie können wir",
    highlight: "dich kontaktieren?",
    subtitle:
      "Im nächsten Schritt wird dich ein Mitarbeiter aus dem Team anrufen und herausfinden, ob und wie wir dir helfen können.",
  },
];

export function Funnel() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const total = STEPS.length;
  const current = STEPS[step];
  const progress = Math.round(((step + 1) / total) * 100);

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [current.id]: value }));
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function submitInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const value = String(fd.get(current.id) ?? "").trim();
    setAnswers((a) => ({ ...a, [current.id]: value }));
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email,
          phone,
          ...answers,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Fehler");
      // Serverseitiges Lead-Event (Meta CAPI) + Browser-Pixel via GTM.
      // Der keepalive-Beacon übersteht den anschließenden Seitenwechsel.
      trackMetaEvent("Lead", { email, phone });
      // Weiter zur Terminbuchung (Calendly). submitting bleibt aktiv, bis die
      // Navigation greift, damit der Button nicht zurückspringt.
      router.push("/terminbuchung");
    } catch {
      setError(
        "Beim Absenden ist etwas schiefgelaufen. Bitte versuche es erneut.",
      );
      setSubmitting(false);
    }
  }

  const selected = current.type === "choice" ? answers[current.id] : undefined;
  const showBack = step > 0;
  const hasIcons =
    current.type === "choice" && current.options.some((o) => o.icon);

  return (
    <div className="overflow-hidden border border-border bg-card">
      {/* Kopfzeile: Zurück + Schrittzähler */}
      <div className="flex h-14 items-center justify-between border-b border-border px-5 sm:px-8">
        {showBack ? (
          <button
            type="button"
            onClick={back}
            aria-label="Zurück"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-5" />
            Zurück
          </button>
        ) : (
          <span />
        )}
        <span className="text-sm font-medium text-muted-foreground">
          Schritt {step + 1} von {total}
        </span>
      </div>

      {/* Inhalt */}
      <div className="px-5 py-10 sm:px-10 sm:py-14">
        <h2 className="text-center font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {current.lead}{" "}
          <span className="text-signal">{current.highlight}</span>
        </h2>

        {current.type === "contact" && (
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            {current.subtitle}
          </p>
        )}

        {/* Auswahlfrage mit Icon-Karten */}
        {current.type === "choice" && hasIcons && (
          <>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {current.options.map((o) => {
                const isSel = selected === o.label;
                const Icon = o.icon ?? HelpCircle;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => choose(o.label)}
                    className={`flex cursor-pointer flex-col items-center gap-4 border p-5 text-center transition-colors ${
                      isSel
                        ? "border-signal bg-signal/5"
                        : "border-border bg-card hover:border-signal"
                    }`}
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-icon-bg text-signal">
                      <Icon className="size-7" />
                    </span>
                    <span className="text-sm font-semibold leading-snug sm:text-base">
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Tippe auf eine Auswahl
            </p>
          </>
        )}

        {/* Auswahlfrage ohne Icons: schlichte Pills, einspaltig gestapelt */}
        {current.type === "choice" && !hasIcons && (
          <>
            <div className="mx-auto mt-10 grid max-w-xl gap-4">
              {current.options.map((o) => {
                const isSel = selected === o.label;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => choose(o.label)}
                    className={`flex cursor-pointer items-center justify-between gap-4 border p-5 text-left transition-colors ${
                      isSel
                        ? "border-signal bg-signal/5"
                        : "border-border bg-card hover:border-signal"
                    }`}
                  >
                    <span className="font-semibold">{o.label}</span>
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-[999px] border-2 ${
                        isSel ? "border-signal" : "border-border"
                      }`}
                    >
                      {isSel && (
                        <span className="size-3 rounded-[999px] bg-signal" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Tippe auf eine Auswahl
            </p>
          </>
        )}

        {/* Freitext-Schritt */}
        {current.type === "input" && (
          <form
            onSubmit={submitInput}
            className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <Input
              name={current.id}
              defaultValue={answers[current.id] ?? ""}
              required
              autoFocus
              placeholder={current.placeholder}
              className="h-11 flex-1"
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              {current.cta}
            </Button>
          </form>
        )}

        {/* Kontaktblock */}
        {current.type === "contact" && (
          <form
            onSubmit={submitContact}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Vor- und Nachname"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  E-Mail-Adresse *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@beispiel.de"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                Handynummer *
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Nummer, unter der wir dich am besten erreichen"
              />
            </div>
            <label className="flex items-center gap-3 py-1 text-sm text-muted-foreground">
              <input
                type="checkbox"
                required
                className="size-5 shrink-0 accent-[#00c281]"
              />
              <span>
                Hiermit akzeptiere ich die{" "}
                <Link
                  href="/datenschutz"
                  className="text-signal underline underline-offset-2 hover:text-foreground"
                >
                  Datenschutzbestimmungen
                </Link>{" "}
                *
              </span>
            </label>
            {error && (
              <p className="text-center text-sm font-medium text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="mt-2 w-full"
            >
              {submitting ? "Wird gesendet …" : "Nächste"}
            </Button>
          </form>
        )}
      </div>

      {/* Fortschrittslinie */}
      <div className="h-1.5 w-full bg-muted">
        <div
          className="h-full bg-signal transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
