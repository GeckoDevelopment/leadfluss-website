"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

// Offizielles Calendly-Inline-Widget: der <div class="calendly-inline-widget">
// mit data-url wird von widget.js beim Laden automatisch initialisiert – das
// deckt den Hauptfall ab (Direktaufruf per E-Mail-Link, voller Seitenload).
//
// Der useEffect ist nur ein Fallback für client-seitige Navigation innerhalb
// der Seite: dann ist widget.js schon geladen und scannt nicht erneut, also
// initialisieren wir das Widget selbst – aber nur, wenn noch kein iframe da ist
// (verhindert doppelte Kalender).
export function CalendlyEmbed({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      if (el.querySelector("iframe")) return; // schon (auto-)initialisiert
      window.Calendly?.initInlineWidget({ url, parentElement: el });
    }, 400);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <>
      <div
        ref={ref}
        className={["calendly-inline-widget", className].filter(Boolean).join(" ")}
        data-url={url}
        style={{ minWidth: 320, height: 700 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
