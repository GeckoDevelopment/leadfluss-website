import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// createClient wirft bei leerer projectId. Im Demo-Modus (keine Verbindung)
// wird dieser Platzhalter nie für echte Anfragen verwendet.
const safeProjectId = projectId || "placeholder";

// Das Dataset ist privat – deshalb liest die Website serverseitig mit einem
// Token (bevorzugt ein reines Read-Token; ersatzweise das Write-Token).
// Dieser Client wird ausschließlich in Server-Komponenten verwendet, der Token
// gelangt daher nie in den Browser. useCdn ist bei Token-Reads aus, damit
// Inhalte sofort (ohne CDN-Verzögerung) erscheinen; Caching übernimmt Next.js
// über `revalidate`.
const readToken =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

export const client = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: !readToken,
  token: readToken,
  // Öffentliche Website: nur veröffentlichte Inhalte rendern. Ohne diese
  // Angabe liefert die API mit Token standardmäßig die "raw"-Perspektive und
  // würde auch Entwürfe (z. B. wieder offline gestellte Artikel) ausspielen.
  perspective: "published",
});

/** Schreibender Client für Formular-Einsendungen (nur serverseitig nutzen). */
export const writeClient = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
