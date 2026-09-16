"use client";

import * as React from "react";

/**
 * Zeigt einen iOS-artigen Benachrichtigungs-Slot als reines HTML/CSS – der
 * Nachfolger der früheren transparenten Video-Animationen. Da Safari/iOS keine
 * Transparenz in WebM unterstützt (dort entstanden schwarze Flächen), setzen
 * wir die „Anfrage-Benachrichtigungen" nativ um: gestochen scharf, winzig,
 * barrierefrei und auf jedem Gerät transparent zum Hintergrund.
 *
 * Wie in den Original-Videos laufen pro Slot mehrere Meldungen im Loop: eine
 * Karte gleitet ein, bleibt kurz, blendet aus, dann folgt die nächste. Der
 * Loop startet erst, wenn der Slot in den Viewport scrollt, und je nach `index`
 * leicht zeitversetzt. Bei `prefers-reduced-motion` steht die erste Meldung
 * still, ganz ohne Bewegung.
 */

type AppKind = "mail" | "imessage" | "whatsapp";

export type NotifMessage = {
  title: string;
  body: string;
  /** Optionale zweite Zeile, steht immer auf einer eigenen Zeile unter `body`. */
  note?: string;
};

// Original-App-Icons als Bilddateien (mit transparenten Ecken) in
// public/animationen/icons/. Alle drei sind Squircle-Icons.
const APP_ICON: Record<AppKind, { label: string; src: string }> = {
  mail: { label: "Mail", src: "/animationen/icons/mail.webp" },
  imessage: { label: "Nachrichten", src: "/animationen/icons/imessage.webp" },
  whatsapp: { label: "WhatsApp", src: "/animationen/icons/whatsapp.png" },
};

// Ablaufzeiten einer einzelnen Karte im Loop (in ms).
const IN = 450; // Einblenden
const HOLD = 2900; // Sichtbar stehenbleiben
const OUT = 450; // Ausblenden
const GAP = 300; // Pause zwischen zwei Karten (unsichtbar)

export function LeadNotification({
  app,
  messages,
  time = "jetzt",
  index = 0,
}: {
  app: AppKind;
  /** Meldungen, die nacheinander im Loop gezeigt werden. */
  messages: NotifMessage[];
  /** Zeitstempel oben rechts, z. B. „jetzt". */
  time?: string;
  index?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [i, setI] = React.useState(0);
  const [shown, setShown] = React.useState(false);
  const started = React.useRef(false);
  const icon = APP_ICON[app];
  const list = messages ?? [];
  const count = list.length;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timers: number[] = [];
    let cancelled = false;
    const wait = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const cycle = () => {
      if (cancelled) return;
      setShown(true); // aktuelle Meldung einblenden
      wait(IN + HOLD, () => {
        if (cancelled) return;
        setShown(false); // ausblenden
        wait(OUT, () => {
          if (cancelled) return;
          setI((p) => (p + 1) % count); // nächste Meldung (unsichtbar tauschen)
          wait(GAP, cycle);
        });
      });
    };

    const begin = () => {
      if (started.current) return;
      started.current = true;
      if (reduce || count <= 1) {
        setShown(true); // statisch, keine Bewegung
        return;
      }
      wait(index * 600, cycle); // leicht versetzter Start pro Slot
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            begin();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [index, count]);

  const msg = list[i] ?? { title: "", body: "" };

  return (
    <div ref={ref} className="mx-auto w-full max-w-sm">
      <div
        role="status"
        aria-live="polite"
        className={[
          "flex min-h-[5.5rem] items-center gap-3 rounded-[16px] p-3 pr-3.5",
          "bg-[#e7e7ec]/95 shadow-lg shadow-black/10 ring-1 ring-black/[0.06] backdrop-blur-md",
          "transition-all duration-500 ease-out motion-reduce:transition-none",
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        ].join(" ")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon.src}
          alt={icon.label}
          width={48}
          height={48}
          className="size-12 shrink-0 drop-shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[15px] font-semibold leading-tight text-[#1c1c1e]">
              {msg.title}
            </p>
            <span className="shrink-0 text-[13px] leading-tight text-[#8a8a8e]">
              {time}
            </span>
          </div>
          <p className="mt-1 text-[14px] leading-snug text-[#48484c]">
            {msg.body}
            {msg.note && (
              <>
                <br />
                {msg.note}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
