import {
  Sun,
  ShowerHead,
  Accessibility,
  DoorOpen,
  Thermometer,
  type LucideIcon,
} from "lucide-react";

export type Branche = {
  slug: string;
  label: string;
  icon: LucideIcon;
  /** Kurzer Teaser für das Navbar-Dropdown. */
  teaser: string;
  /** Beschreibung für den Seitenkopf & Meta-Description. */
  description: string;
};

export const BRANCHEN: Branche[] = [
  {
    slug: "photovoltaik",
    label: "Photovoltaik",
    icon: Sun,
    teaser: "Anfragen von kaufbereiten Solar-Interessenten.",
    description:
      "Planbar neue Kundenanfragen für dein Photovoltaik-Unternehmen – von der Kampagne bis zur qualifizierten Anfrage.",
  },
  {
    slug: "badsanierung",
    label: "Badsanierung",
    icon: ShowerHead,
    teaser: "Volle Auftragsbücher für dein Bad-Handwerk.",
    description:
      "Regionale Anfragen für Badsanierungen – vorqualifiziert, damit nur ernsthafte Interessenten bei dir ankommen.",
  },
  {
    slug: "treppenlifte",
    label: "Treppenlifte",
    icon: Accessibility,
    teaser: "Kaufbereite Anfragen für Treppenlifte.",
    description:
      "Qualifizierte Anfragen von Menschen, die einen Treppenlift suchen – zielgenau in deiner Region.",
  },
  {
    slug: "bauelemente",
    label: "Bauelemente",
    icon: DoorOpen,
    teaser: "Anfragen für Fenster, Türen & mehr.",
    description:
      "Neue Kundenanfragen für Bauelemente wie Fenster, Türen und Tore – planbar und regional.",
  },
  {
    slug: "waermepumpen",
    label: "Wärmepumpen",
    icon: Thermometer,
    teaser: "Interessenten für den Heizungstausch.",
    description:
      "Planbare Anfragen von Eigentümern, die auf eine Wärmepumpe umsteigen wollen – vorqualifiziert und regional.",
  },
];

export function getBranche(slug: string): Branche | undefined {
  return BRANCHEN.find((b) => b.slug === slug);
}
