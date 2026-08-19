"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  Handshake,
  Box,
  HelpCircle,
  Users,
  Smartphone,
  Clock,
  TrendingUp,
  Scale,
  HeartHandshake,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type IconType = React.ComponentType<{ className?: string }>;
type Option = { label: string; icon: IconType };

type Step =
  | {
      id: string;
      type: "cards";
      lead: string;
      highlight: string;
      options: Option[];
    }
  | {
      id: string;
      type: "list";
      lead: string;
      highlight: string;
      options: string[];
    }
  | {
      id: string;
      type: "contact";
      lead: string;
      highlight: string;
      subtitle: string;
    };

const STEPS: Step[] = [
  {
    id: "betrieb",
    type: "cards",
    lead: "Welche Art von",
    highlight: "Betrieb bist du?",
    options: [
      { label: "Fachbetrieb", icon: Wrench },
      { label: "Vertriebsfirma", icon: Handshake },
      { label: "Händler / Hersteller", icon: Box },
      { label: "Etwas anderes", icon: HelpCircle },
    ],
  },
  {
    id: "auftraege",
    type: "list",
    lead: "Wie viele Aufträge schließt du aktuell",
    highlight: "pro Monat ab (im Schnitt)?",
    options: ["Weniger als 10", "11 bis 20", "21 bis 50", "mehr als 50"],
  },
  {
    id: "problem",
    type: "cards",
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
    type: "cards",
    lead: "Was ist dein",
    highlight: "unternehmerisches Ziel?",
    options: [
      { label: "Wachstum", icon: TrendingUp },
      { label: "Stabilität", icon: Scale },
      { label: "Höhere Abschlussrate", icon: HeartHandshake },
      { label: "Etwas anderes", icon: HelpCircle },
    ],
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
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [done, setDone] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const total = STEPS.length;
  const current = STEPS[step];
  const progress = done ? 100 : Math.round(((step + 1) / total) * 100);

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [current.id]: value }));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setStep((s) => Math.min(s + 1, total - 1)),
      320
    );
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: an echten Endpunkt anbinden (Resend / Sanity / CRM).
    setDone(true);
  }

  const selected = answers[current.id];

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_0%,color-mix(in_oklch,var(--signal),transparent_90%),transparent)]" />

      {/* Kopf: Zurück */}
      <div className="px-5 py-6 sm:px-8">
        {step === 0 && !done ? (
          <Link
            href="/"
            aria-label="Zurück zur Startseite"
            className="inline-flex text-muted-foreground transition-colors hover:text-signal"
          >
            <ArrowLeft className="size-7" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => (done ? setDone(false) : back())}
            aria-label="Zurück"
            className="inline-flex text-muted-foreground transition-colors hover:text-signal"
          >
            <ArrowLeft className="size-7" />
          </button>
        )}
      </div>

      {/* Inhalt */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10 sm:px-6">
        <div className="w-full max-w-3xl">
          {done ? (
            <div className="flex flex-col items-center text-center">
              <span className="flex size-16 items-center justify-center bg-signal text-white">
                <Check className="size-8" />
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Danke für deine Angaben!
              </h1>
              <p className="mt-4 max-w-md text-muted-foreground">
                Wir melden uns in Kürze telefonisch bei dir, um deine kostenlose
                Potenzialanalyse zu besprechen.
              </p>
              <Button
                size="lg"
                className="mt-8"
                render={<Link href="/">Zur Startseite</Link>}
              />
            </div>
          ) : (
            <>
              <h1 className="text-center font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {current.lead}{" "}
                <span className="text-signal">{current.highlight}</span>
              </h1>

              {current.type === "contact" && (
                <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
                  {current.subtitle}
                </p>
              )}

              {current.type === "cards" && (
                <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                  {current.options.map((opt) => {
                    const isSel = selected === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => choose(opt.label)}
                        className={`group flex flex-col items-center justify-center gap-4 border p-6 text-center transition-colors ${
                          isSel
                            ? "border-signal bg-signal/5"
                            : "border-border bg-card hover:border-signal"
                        }`}
                      >
                        <span
                          className={`flex size-14 items-center justify-center transition-colors ${
                            isSel
                              ? "bg-signal text-white"
                              : "bg-icon-bg text-signal"
                          }`}
                        >
                          <opt.icon className="size-7" />
                        </span>
                        <span className="text-sm font-semibold sm:text-base">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {current.type === "list" && (
                <div className="mx-auto mt-12 flex max-w-xl flex-col gap-3">
                  {current.options.map((label) => {
                    const isSel = selected === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => choose(label)}
                        className={`flex items-center gap-4 border px-5 py-4 text-left transition-colors ${
                          isSel
                            ? "border-signal bg-signal/5"
                            : "border-border bg-card hover:border-signal"
                        }`}
                      >
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center border-2 ${
                            isSel ? "border-signal" : "border-border"
                          }`}
                        >
                          {isSel && <span className="size-2.5 bg-signal" />}
                        </span>
                        <span className="flex-1 text-center font-semibold">
                          {label}
                        </span>
                        <span className="size-5 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}

              {current.type === "contact" && (
                <form
                  onSubmit={submitContact}
                  className="mx-auto mt-10 flex max-w-xl flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="name" placeholder="Name" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email-Adresse"
                    />
                  </div>
                  <Input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Handynummer (wo Sie am besten zu erreichen sind) *"
                  />
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
                  <Button type="submit" size="lg" className="mt-2 w-full">
                    Nächste
                  </Button>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fortschrittsbalken */}
      <div className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-3xl border border-border p-1">
          <div
            className="h-3 bg-signal transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
