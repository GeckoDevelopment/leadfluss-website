"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

// Öffnet den Cookie-Banner erneut (Widerruf/Anpassung der Einwilligung).
// Wird im Footer verlinkt, damit die Einwilligung jederzeit änderbar ist.
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      Cookie-Einstellungen
    </button>
  );
}
