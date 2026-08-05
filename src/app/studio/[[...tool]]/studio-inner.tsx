import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Wird ausschließlich clientseitig geladen (siehe studio-client.tsx),
// damit die Sanity-Abhängigkeiten nicht im Server-Build ausgewertet werden.
export default function StudioInner() {
  return <NextStudio config={config} />;
}
