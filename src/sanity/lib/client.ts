import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// createClient wirft bei leerer projectId. Im Demo-Modus (keine Verbindung)
// wird dieser Platzhalter nie für echte Anfragen verwendet.
const safeProjectId = projectId || "placeholder";

export const client = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/** Schreibender Client für Formular-Einsendungen (nur serverseitig nutzen). */
export const writeClient = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
