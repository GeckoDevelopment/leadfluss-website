import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({ projectId: projectId || "placeholder", dataset });

/**
 * Hilfsfunktion zum Erzeugen von Sanity-Bild-URLs.
 * Aktuell liefern die GROQ-Abfragen die URL direkt (asset->url);
 * dieser Builder steht für künftige Bildtransformationen bereit.
 */
export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
