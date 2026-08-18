import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

export type CaseStudy = {
  _id: string;
  name: string;
  role?: string;
  branch?: string;
  location?: string;
  result: string;
  text?: string;
  logoUrl?: string;
};

export const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(order asc, name asc) {
    _id,
    name,
    role,
    branch,
    location,
    result,
    text,
    "logoUrl": logo.asset->url
  }
`;

/** Demo-Fallstudien (bis das Leadfluss-Sanity verbunden ist). */
const DEMO_CASE_STUDIES: CaseStudy[] = [
  {
    _id: "demo-1",
    name: "SoNachhaltig GmbH",
    role: "Regionaler Solarfachbetrieb",
    location: "Speyer",
    branch: "Photovoltaik",
    text: "Für den regionalen Fachbetrieb SoNachhaltig generieren wir pro Monat über 50 Solar Leads zusätzlich über Videomarketing und Brandingkampagnen.",
    result: "50+ Leads pro Monat zusätzlich",
  },
  {
    _id: "demo-2",
    name: "Solarzentrum Rheingau",
    role: "Regionaler PV-Fachbetrieb",
    location: "Rheingau-Taunus Kreis",
    branch: "Photovoltaik",
    text: "Durch unsere Online-Strategien gewinnt das Solarzentrum Rheingau seit 2024 verlässlich monatlich 30 zusätzliche qualifizierte Interessenten.",
    result: "30+ Leads pro Monat",
  },
  {
    _id: "demo-3",
    name: "Commodus GmbH",
    role: "Dienstleister für barrierefreie Bäder",
    location: "Krefeld",
    branch: "Barrierefreie Bäder",
    text: 'Speziell für das Thema „Wanne zu Dusche in 24 Stunden" generieren wir für die Firma Commodus GmbH aus Krefeld über 200 Leads pro Monat. Auch sorgen die produzierten Kundeninterviews für bessere Abschlussquoten.',
    result: "200 Leads pro Monat",
  },
  {
    _id: "demo-4",
    name: "Attendorner Dachtechnik",
    role: "Dachdeckerbetrieb aus Attendorn",
    location: "Attendorn (Sauerland)",
    branch: "Dachsanierung und PV",
    text: "Zusammen mit Inhaber Janik Bauer haben wir einen stetigen Leadfluss von 40+ Leads pro Monat aufgebaut, dank authentischen Einblicken von Baustellen und Kundenstimmen-Videos.",
    result: "40 Leads pro Monat",
  },
  {
    _id: "demo-5",
    name: "Viterma Neustadt",
    role: "Luxus Vollbadsanierung",
    location: "Neustadt a. d. Weinstraße",
    branch: "Vollbadsanierung",
    text: "Mit dem Viterma Standort aus der Pfalz haben wir gemeinsam eine Videomarketing-Strategie entwickelt, mit der kaufwillige Hausbesitzer auf den Badanbieter aus Neustadt aufmerksam werden und direkt ihre Anfrage stellen können.",
    result: "80 Leads pro Monat",
  },
  {
    _id: "demo-6",
    name: "Energietechnik Schermuly",
    role: "Photovoltaik Fachbetrieb aus Gießen",
    location: "Gießen",
    branch: "Photovoltaik",
    text: "Zuvor hat die Gießener Solarfirma ihre Aufträge nur über Empfehlungen und Google gewonnen. Das haben wir innerhalb von nur 14 Tagen geändert. Sobald ein Eigenheimbesitzer in Hessen über eine Solaranlage nachdenkt, bekommt er Anzeigen von Energietechnik Schermuly präsentiert.",
    result: "50 Leads pro Monat",
  },
];

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSanityConfigured) return DEMO_CASE_STUDIES;
  return client.fetch(CASE_STUDIES_QUERY);
}
