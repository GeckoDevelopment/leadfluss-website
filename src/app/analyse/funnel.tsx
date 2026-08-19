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

const TILE_BASE =
  "group flex flex-col items-center justify-center gap-4 rounded-[16px] p-6 text-center ring-1 transition-all";

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
  const progress = done
    ? 100
    : Math.round(((step + 1) / total) * 100);

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
    <div className="relative flex min-h-screen flex-col bg-[radial-gradient(125%_125%_at_50%_0%,#1c3b30_0%,#0e211b_55%,#081310_100%)] text-white">
      {/* Kopf: Zurück */}
      <div className="px-5 py-6 sm:px-8">
        {step === 0 && !done ? (
          <Link
            href="/"
            aria-label="Zurück zur Startseite"
            className="inline-flex text-signal transition-transform hover:-translate-x-0.5"
          >
            <ArrowLeft className="size-7" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => (done ? setDone(false) : back())}
            aria-label="Zurück"
            className="inline-flex text-signal transition-transform hover:-translate-x-0.5"
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
              <span className="flex size-16 items-center justify-center rounded-[999px] bg-signal text-[color:var(--signal-foreground)]">
                <Check className="size-8" />
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold sm:text-4xl">
                Danke für deine Angaben!
              </h1>
              <p className="mt-4 max-w-md text-white/70">
                Wir melden uns in Kürze telefonisch bei dir, um deine kostenlose
                Potenzialanalyse zu besprechen.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center rounded-[999px] bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-white/90"
              >
                Zur Startseite
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-center font-heading text-3xl font-bold leading-tight sm:text-4xl">
                {current.lead}{" "}
                <span className="text-signal">{current.highlight}</span>
              </h1>

              {current.type === "contact" && (
                <p className="mx-auto mt-4 max-w-xl text-center text-white/70">
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
                        className={`${TILE_BASE} ${
                          isSel
                            ? "bg-gradient-to-br from-white via-emerald-100 to-signal text-neutral-900 ring-signal"
                            : "bg-[#0f3529] text-white ring-white/10 hover:ring-signal/60"
                        }`}
                      >
                        <opt.icon className="size-10 sm:size-12" />
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
                        className={`flex items-center gap-4 rounded-[999px] px-5 py-4 text-left ring-1 transition-all ${
                          isSel
                            ? "bg-[#134334] ring-signal"
                            : "bg-[#0f3529] ring-white/10 hover:ring-signal/60"
                        }`}
                      >
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-[999px] border-2 ${
                            isSel
                              ? "border-signal"
                              : "border-white/25"
                          }`}
                        >
                          {isSel && (
                            <span className="size-3 rounded-[999px] bg-signal" />
                          )}
                        </span>
                        <span className="flex-1 text-center font-semibold">
                          {label}
                        </span>
                        <span className="size-6 shrink-0" />
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
                    <input
                      name="name"
                      placeholder="Name"
                      className="rounded-[999px] bg-[#0f3529] px-6 py-4 text-white ring-1 ring-white/10 placeholder:text-white/40 focus:ring-2 focus:ring-signal focus:outline-none"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email-Adresse"
                      className="rounded-[999px] bg-[#0f3529] px-6 py-4 text-white ring-1 ring-white/10 placeholder:text-white/40 focus:ring-2 focus:ring-signal focus:outline-none"
                    />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Handynummer (wo Sie am besten zu erreichen sind) *"
                    className="rounded-[999px] bg-[#0f3529] px-6 py-4 text-white ring-1 ring-white/10 placeholder:text-white/40 focus:ring-2 focus:ring-signal focus:outline-none"
                  />
                  <label className="flex items-center gap-3 py-1 text-sm text-white/80">
                    <input
                      type="checkbox"
                      required
                      className="size-5 shrink-0 accent-[#00c281]"
                    />
                    Hiermit akzeptiere ich die{" "}
                    <Link
                      href="/datenschutz"
                      className="underline hover:text-white"
                    >
                      Datenschutzbestimmungen
                    </Link>{" "}
                    *
                  </label>
                  <button
                    type="submit"
                    className="mt-2 rounded-[999px] bg-white py-4 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition-colors hover:bg-white/90"
                  >
                    Nächste
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fortschrittsbalken */}
      <div className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[8px] border border-white/15 p-1">
          <div
            className="h-3 rounded-[6px] bg-signal transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
