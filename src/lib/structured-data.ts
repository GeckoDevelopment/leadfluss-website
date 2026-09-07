// Zentrale Konstanten und Schema-Bausteine für strukturierte Daten (JSON-LD).
// Wird von Layout und einzelnen Seiten genutzt.

export const SITE_URL = "https://www.leadfluss.de";

// Organisation/Unternehmen – wird site-weit im (site)-Layout eingebunden.
// Daten aus Impressum (Leadfluss GmbH, Leipzig) und Footer (Kontakt, Social).
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Leadfluss GmbH",
  alternateName: "Leadfluss",
  url: SITE_URL,
  logo: `${SITE_URL}/leadfluss-mark-green.png`,
  image: `${SITE_URL}/og-default.jpg`,
  description:
    "Videomarketing-Agentur für den Mittelstand: professionelle Werbevideos, die neue Kunden gewinnen und Arbeitsplätze attraktiver machen.",
  telephone: "+49 341 60823338",
  email: "info@leadfluss.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rückertstraße 4",
    postalCode: "04157",
    addressLocality: "Leipzig",
    addressCountry: "DE",
  },
  sameAs: ["https://www.instagram.com/leadfluss.de"],
};
