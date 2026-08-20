import type { Metadata } from "next";
import { NotFoundContent } from "@/components/site/not-found-content";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description: "Diese Seite existiert nicht oder wurde verschoben.",
};

// Fängt notFound()-Aufrufe aus den (site)-Routen ab. Navbar und Footer liefert
// bereits das (site)-Layout – hier nur der Inhalt.
export default function SiteNotFound() {
  return <NotFoundContent />;
}
