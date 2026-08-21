import Script from "next/script";
import {
  CONSENT_COOKIE,
  CONSENT_VERSION,
} from "@/lib/consent";

// Google Consent Mode v2 – Standardzustand VOR dem Laden des Tag Managers.
//
// Läuft mit strategy="beforeInteractive", d. h. vor jeglichem Next.js-Code und
// vor dem afterInteractive-Script des GoogleTagManagers. Damit steht bereits
// fest, dass ohne Einwilligung keine Analyse-/Marketing-Cookies gesetzt werden.
// Hat der Nutzer früher schon zugestimmt (Cookie vorhanden), wird die Auswahl
// hier direkt angewandt, bevor GTM Tags auslöst.
//
// WICHTIG: beforeInteractive-Scripts müssen im Root-Layout stehen.
const CONSENT_DEFAULT = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  try {
    var m = document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);
    if (m) {
      var c = JSON.parse(decodeURIComponent(m[1]));
      if (c && c.v === ${CONSENT_VERSION}) {
        gtag('consent', 'update', {
          analytics_storage: c.statistik ? 'granted' : 'denied',
          ad_storage: c.marketing ? 'granted' : 'denied',
          ad_user_data: c.marketing ? 'granted' : 'denied',
          ad_personalization: c.marketing ? 'granted' : 'denied',
          personalization_storage: c.marketing ? 'granted' : 'denied'
        });
      }
    }
  } catch (e) {}
})();
`;

export function ConsentMode() {
  return (
    // Im App Router ist das Root-Layout der vorgesehene Ort für
    // beforeInteractive-Scripts (es gibt kein pages/_document.js) – daher ist
    // die entsprechende Lint-Regel hier nicht einschlägig.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="lf-consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT }}
    />
  );
}
