// Client-seitiges Auslösen von Meta-Events für serverseitiges Tracking.
//
// Jedes Event wird ZWEIMAL ausgelöst und über eine geteilte event_id
// dedupliziert (Meta verwirft das Duplikat):
//   1) Browser-Pixel via GTM – wir pushen ein dataLayer-Event samt event_id,
//      der Meta-Pixel-Tag in GTM nutzt diese ID als "Event ID".
//   2) Server via First-Party-Beacon an /api/capi → Conversions API.
//
// Es wird ausschließlich mit Marketing-Einwilligung (lf_consent) gefeuert.

import { readConsent } from "@/lib/consent";

export type MetaEventName = "PageView" | "Lead";

interface MetaUserData {
  email?: string;
  phone?: string;
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback (Meta akzeptiert jede eindeutige Zeichenkette als event_id).
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function trackMetaEvent(
  eventName: MetaEventName,
  user?: MetaUserData,
): void {
  if (typeof window === "undefined") return;
  // Ohne Marketing-Einwilligung passiert nichts.
  if (!readConsent()?.marketing) return;

  const eventId = newEventId();

  // 1) An GTM: dataLayer-Event, damit der Meta-Pixel-Tag mit derselben
  //    event_id feuert (Dedup-Schlüssel für Meta).
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName === "Lead" ? "lf_meta_lead" : "lf_meta_pageview",
    lf_meta_event_id: eventId,
    lf_meta_event_name: eventName,
  });

  // 2) An unseren Server: First-Party-Beacon → Conversions API.
  //    keepalive, damit der Request auch bei Seitenwechsel durchgeht.
  const body = JSON.stringify({
    eventName,
    eventId,
    eventSourceUrl: window.location.href,
    ...user,
  });
  try {
    void fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Tracking darf die Nutzung nie stören.
  }
}
