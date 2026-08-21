"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackMetaEvent } from "@/lib/meta-track";

type Step =
  | {
      id: string;
      type: "choice";
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
    type: "choice",
    lead: "Welche Art von",
    highlight: "Betrieb bist du?",
    options: ["Fachbetrieb", "Vertriebsfirma", "Händler / Hersteller", "Etwas anderes"],
  },
  {
    id: "auftraege",
    type: "choice",
    lead: "Wie viele Aufträge schließt du aktuell",
    highlight: "pro Monat ab (im Schnitt)?",
    options: ["Weniger als 10", "11 bis 20", "21 bis 50", "mehr als 50"],
  },
  {
    id: "problem",
    type: "choice",
    lead: "Was ist dein aktuell",
    highlight: "größtes Problem?",
    options: [
      "Zu wenig Kundenanfragen",
      "Schlechte Anfragenqualität",
      "Keine Zeit für Marketing",
      "Etwas anderes",
    ],
  },
  {
    id: "ziel",
    type: "choice",
    lead: "Was ist dein",
    highlight: "unternehmerisches Ziel?",
    options: ["Wachstum", "Stabilität", "Höhere Abschlussrate", "Etwas anderes"],
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
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const total = STEPS.length;
  const current = STEPS[step];
  const progress = done ? 100 : Math.round(((step + 1) / total) * 100);

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [current.id]: value }));
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
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
      setDone(true);
      // Serverseitiges Lead-Event (Meta CAPI) + Browser-Pixel via GTM.
      trackMetaEvent("Lead", { email, phone });
    } catch {
      setError(
        "Beim Absenden ist etwas schiefgelaufen. Bitte versuche es erneut.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const selected = answers[current.id];
  const showBack = done || step > 0;

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
        {!done && (
          <span className="text-sm font-medium text-muted-foreground">
            Schritt {step + 1} von {total}
          </span>
        )}
      </div>

      {/* Inhalt */}
      <div className="px-5 py-10 sm:px-10 sm:py-14">
        {done ? (
          <div className="flex flex-col items-center text-center">
            <span className="flex size-16 items-center justify-center bg-signal text-white">
              <Check className="size-8" />
            </span>
            <h2 className="mt-6 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Danke für deine Angaben!
            </h2>
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
            <h2 className="text-center font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {current.lead}{" "}
              <span className="text-signal">{current.highlight}</span>
            </h2>

            {current.type === "contact" && (
              <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
                {current.subtitle}
              </p>
            )}

            {current.type === "choice" && (
              <>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {current.options.map((label) => {
                    const isSel = selected === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => choose(label)}
                        className={`flex items-center justify-between gap-4 border p-5 text-left transition-colors ${
                          isSel
                            ? "border-signal bg-signal/5"
                            : "border-border bg-card hover:border-signal"
                        }`}
                      >
                        <span className="font-semibold">{label}</span>
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
          </>
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
