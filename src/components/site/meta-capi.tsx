"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMetaEvent } from "@/lib/meta-track";
import { CONSENT_UPDATED_EVENT } from "@/lib/consent";

// Serverseitiges PageView-Tracking (Meta Conversions API) für jeden Besuch.
// Feuert bei jedem Routenwechsel – aber nur mit Marketing-Einwilligung. Erteilt
// der Nutzer die Einwilligung erst nachträglich, wird der aktuelle PageView
// über das Consent-Event nachgezogen (analog zum Browser-Pixel).
export function MetaCapi() {
  const pathname = usePathname();
  // Merkt sich den zuletzt getrackten Pfad, damit pro Seitenaufruf GENAU EIN
  // PageView mit EINER event_id entsteht. Ohne diesen Guard feuert der Effect
  // im Dev-Modus (React Strict Mode) doppelt → zwei IDs → Deduplizierung mit
  // dem Browser-Pixel schlägt fehl.
  const lastTracked = useRef<string | null>(null);

  // Bei jedem Seitenaufruf/Routenwechsel – aber nur einmal pro Pfad.
  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    trackMetaEvent("PageView");
  }, [pathname]);

  // Nach nachträglicher Einwilligung den aktuellen PageView nachziehen.
  useEffect(() => {
    const onConsent = () => trackMetaEvent("PageView");
    window.addEventListener(CONSENT_UPDATED_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsent);
  }, []);

  return null;
}
