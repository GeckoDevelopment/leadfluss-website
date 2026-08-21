// Zentrale Consent-Logik (DSGVO / TTDSG) für die Leadfluss-Website.
//
// Umgesetzt als Google Consent Mode v2: Vor dem Laden des Google Tag Managers
// stehen alle Einwilligungs-Signale auf "denied" (siehe consent-mode.tsx). Der
// Nutzer entscheidet im Cookie-Banner (cookie-consent.tsx); die Auswahl wird in
// einem Cookie gespeichert und per gtag('consent','update', …) an GTM gemeldet.

export type ConsentCategory = "statistik" | "marketing";

export interface ConsentState {
  /** Statistik/Analyse (z. B. Google Analytics) → analytics_storage. */
  statistik: boolean;
  /** Marketing/Remarketing (z. B. Google Ads) → ad_storage & Co. */
  marketing: boolean;
}

/** Persistiertes Cookie-Format inkl. Version & Zeitstempel. */
export interface StoredConsent extends ConsentState {
  /** Schema-Version – erlaubt späteres erneutes Einholen der Einwilligung. */
  v: number;
  /** Zeitpunkt der Einwilligung (ISO-String). */
  ts: string;
}

export const CONSENT_COOKIE = "lf_consent";
export const CONSENT_VERSION = 1;
/** Einwilligung 180 Tage merken, danach erneut fragen. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
/** Custom-Event zum erneuten Öffnen des Banners (z. B. Footer-Link). */
export const CONSENT_OPEN_EVENT = "lf:open-cookie-settings";
/** Custom-Event nach jeder Einwilligungs-Änderung (z. B. für Meta-CAPI). */
export const CONSENT_UPDATED_EVENT = "lf:consent-updated";

export const CONSENT_DENIED: ConsentState = { statistik: false, marketing: false };
export const CONSENT_GRANTED: ConsentState = { statistik: true, marketing: true };

/** Liest die gespeicherte Einwilligung aus dem Cookie (nur im Browser). */
export function readConsent(): StoredConsent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + CONSENT_COOKIE + "=([^;]*)"),
  );
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as StoredConsent;
    if (parsed && parsed.v === CONSENT_VERSION) return parsed;
  } catch {
    // Ungültiges/veraltetes Cookie ignorieren – Banner wird erneut angezeigt.
  }
  return null;
}

/**
 * Speichert die Einwilligung, meldet sie an den Consent Mode und legt ein
 * dataLayer-Event für GTM-Trigger ab.
 */
export function writeConsent(state: ConsentState): void {
  if (typeof document === "undefined") return;
  const stored: StoredConsent = {
    ...state,
    v: CONSENT_VERSION,
    ts: new Date().toISOString(),
  };
  const value = encodeURIComponent(JSON.stringify(stored));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax` +
    secure;
  applyConsent(state);
}

/** Übersetzt die Kategorien in Consent-Mode-Signale und meldet sie an GTM. */
export function applyConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Bevorzugt die vom consent-mode-Script definierte globale gtag()-Funktion.
  // Wichtig: gtag pusht das `arguments`-Objekt (nicht ein Array) – nur so
  // erkennt GTM den Consent-Befehl zuverlässig. Der Fallback nutzt dieselbe
  // klassische Signatur.
  const gtag: (...args: unknown[]) => void =
    window.gtag ??
    function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  gtag("consent", "update", {
    analytics_storage: state.statistik ? "granted" : "denied",
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
    personalization_storage: state.marketing ? "granted" : "denied",
  });
  window.dataLayer.push({ event: "lf_consent_update", lf_consent: state });
  // DOM-Event für Nicht-GTM-Consumer (z. B. der Meta-CAPI-Tracker).
  window.dispatchEvent(
    new CustomEvent(CONSENT_UPDATED_EVENT, { detail: state }),
  );
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
