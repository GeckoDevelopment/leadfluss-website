export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * Solange keine Project-ID gesetzt ist, läuft die Seite im Demo-Modus
 * (Beispieldaten statt Live-Inhalte aus Sanity).
 */
export const isSanityConfigured = Boolean(projectId);
