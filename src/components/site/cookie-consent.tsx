"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CONSENT_DENIED,
  CONSENT_GRANTED,
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  type ConsentCategory,
  type ConsentState,
} from "@/lib/consent";

type CategoryMeta = {
  key: ConsentCategory | "notwendig";
  title: string;
  description: string;
  /** Notwendige Cookies sind nicht abwählbar. */
  locked?: boolean;
};

const CATEGORIES: CategoryMeta[] = [
  {
    key: "notwendig",
    title: "Notwendig",
    description:
      "Für den Betrieb der Website technisch erforderlich, z. B. das Speichern deiner Cookie-Auswahl. Immer aktiv.",
    locked: true,
  },
  {
    key: "statistik",
    title: "Statistik",
    description:
      "Anonyme Auswertung der Nutzung (z. B. Google Analytics), damit wir die Website verbessern können.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Messung und Ausspielung von Werbung (z. B. Google Ads), auch auf anderen Plattformen.",
  },
];

function Switch({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center border transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        checked
          ? "border-signal bg-signal"
          : "border-border bg-muted",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span
        className={cn(
          "block size-4 bg-white shadow-sm transition-transform",
          checked ? "translate-x-5.5" : "translate-x-1",
        )}
      />
    </button>
  );
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  // Gespeicherte Auswahl als Startwert (auf dem Server liefert readConsent null
  // → CONSENT_DENIED, im Browser die tatsächliche Wahl).
  const [prefs, setPrefs] = useState<ConsentState>(() => {
    const stored = readConsent();
    return stored
      ? { statistik: stored.statistik, marketing: stored.marketing }
      : CONSENT_DENIED;
  });
  const panelRef = useRef<HTMLDivElement>(null);

  // Banner nur zeigen, wenn noch keine Einwilligung vorliegt. Die Entscheidung
  // hängt vom Cookie ab und ist erst clientseitig möglich – daher im Effect,
  // damit das SSR-Markup (kein Banner) hydrationssicher bleibt.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- einmalige, hydrationssichere Initialisierung aus dem Cookie
    if (!readConsent()) setOpen(true);
  }, []);

  // Erneutes Öffnen über den Footer-Link ("Cookie-Einstellungen").
  useEffect(() => {
    const reopen = () => {
      const stored = readConsent();
      if (stored) {
        setPrefs({ statistik: stored.statistik, marketing: stored.marketing });
      }
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const persist = useCallback((state: ConsentState) => {
    writeConsent(state);
    setPrefs(state);
    setOpen(false);
    setDetails(false);
  }, []);

  const acceptAll = useCallback(() => persist(CONSENT_GRANTED), [persist]);
  const rejectAll = useCallback(() => persist(CONSENT_DENIED), [persist]);
  const saveSelection = useCallback(() => persist(prefs), [persist, prefs]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
      role="dialog"
      aria-modal="false"
      aria-labelledby="lf-consent-title"
      aria-describedby="lf-consent-desc"
    >
      <div
        ref={panelRef}
        className="mx-auto max-w-3xl border border-border bg-card text-card-foreground shadow-2xl motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in motion-safe:duration-500"
      >
        <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center bg-icon-bg text-signal">
            <Cookie className="size-5" />
          </span>
          <div className="flex-1">
            <h2
              id="lf-consent-title"
              className="text-base font-semibold text-foreground"
            >
              Wir respektieren deine Privatsphäre
            </h2>
            <p
              id="lf-consent-desc"
              className="mt-1 text-sm text-muted-foreground"
            >
              Wir nutzen Cookies, um unsere Website bereitzustellen sowie – mit
              deiner Einwilligung – ihre Nutzung zu analysieren und unser
              Marketing zu verbessern. Du kannst deine Auswahl jederzeit
              anpassen. Mehr in unserer{" "}
              <Link
                href="/datenschutz"
                className="font-medium text-signal underline underline-offset-4 hover:no-underline"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <button
            type="button"
            aria-label="Nur notwendige Cookies – schließen"
            onClick={rejectAll}
            className="-mr-1 -mt-1 flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {details && (
          <div className="max-h-[45vh] space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            {CATEGORIES.map((cat) => {
              const checked =
                cat.locked || prefs[cat.key as ConsentCategory] === true;
              return (
                <div key={cat.key} className="flex items-start gap-3">
                  <Switch
                    label={cat.title}
                    checked={checked}
                    disabled={cat.locked}
                    onChange={(v) =>
                      setPrefs((p) => ({
                        ...p,
                        [cat.key as ConsentCategory]: v,
                      }))
                    }
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {cat.title}
                      {cat.locked && (
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          (immer aktiv)
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row-reverse sm:items-center sm:px-6">
          <Button className="sm:flex-1" onClick={acceptAll}>
            Alle akzeptieren
          </Button>
          <Button variant="ghost" className="sm:flex-1" onClick={rejectAll}>
            Nur notwendige
          </Button>
          {details ? (
            <Button
              variant="ghost"
              className="sm:flex-1"
              onClick={saveSelection}
            >
              Auswahl speichern
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="sm:flex-1"
              onClick={() => setDetails(true)}
            >
              Einstellungen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
