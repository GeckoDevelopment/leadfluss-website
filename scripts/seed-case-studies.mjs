/**
 * Legt die bestehenden 6 Fallstudien als caseStudy-Dokumente im
 * Leadfluss-Sanity an (idempotent über deterministische _id).
 *
 * Aufruf:
 *   Trockenlauf:  node scripts/seed-case-studies.mjs
 *   Schreiben:    SEED_COMMIT=1 node scripts/seed-case-studies.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim();
  }
}

const COMMIT = process.env.SEED_COMMIT === "1";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN fehlen (in .env.local setzen).");
  process.exit(1);
}
const base = `https://${projectId}.api.sanity.io/v2024-10-01`;

const CASES = [
  { key: "sonachhaltig", name: "SoNachhaltig GmbH", role: "Regionaler Solarfachbetrieb", location: "Speyer", branch: "Photovoltaik", result: "50+ Leads pro Monat zusätzlich", text: "Für den regionalen Fachbetrieb SoNachhaltig generieren wir pro Monat über 50 Solar Leads zusätzlich über Videomarketing und Brandingkampagnen." },
  { key: "solarzentrum-rheingau", name: "Solarzentrum Rheingau", role: "Regionaler PV-Fachbetrieb", location: "Rheingau-Taunus Kreis", branch: "Photovoltaik", result: "30+ Leads pro Monat", text: "Durch unsere Online-Strategien gewinnt das Solarzentrum Rheingau seit 2024 verlässlich monatlich 30 zusätzliche qualifizierte Interessenten." },
  { key: "commodus", name: "Commodus GmbH", role: "Dienstleister für barrierefreie Bäder", location: "Krefeld", branch: "Barrierefreie Bäder", result: "200 Leads pro Monat", text: "Speziell für das Thema Wanne zu Dusche in 24 Stunden generieren wir für die Firma Commodus GmbH aus Krefeld über 200 Leads pro Monat. Auch sorgen die produzierten Kundeninterviews für bessere Abschlussquoten." },
  { key: "attendorner-dachtechnik", name: "Attendorner Dachtechnik", role: "Dachdeckerbetrieb aus Attendorn", location: "Attendorn (Sauerland)", branch: "Dachsanierung und PV", result: "40 Leads pro Monat", text: "Zusammen mit Inhaber Janik Bauer haben wir einen stetigen Leadfluss von 40+ Leads pro Monat aufgebaut, dank authentischen Einblicken von Baustellen und Kundenstimmen-Videos." },
  { key: "viterma-neustadt", name: "Viterma Neustadt", role: "Luxus Vollbadsanierung", location: "Neustadt a. d. Weinstraße", branch: "Vollbadsanierung", result: "80 Leads pro Monat", text: "Mit dem Viterma Standort aus der Pfalz haben wir gemeinsam eine Videomarketing-Strategie entwickelt, mit der kaufwillige Hausbesitzer auf den Badanbieter aus Neustadt aufmerksam werden und direkt ihre Anfrage stellen können." },
  { key: "energietechnik-schermuly", name: "Energietechnik Schermuly", role: "Photovoltaik Fachbetrieb aus Gießen", location: "Gießen", branch: "Photovoltaik", result: "50 Leads pro Monat", text: "Zuvor hat die Gießener Solarfirma ihre Aufträge nur über Empfehlungen und Google gewonnen. Das haben wir innerhalb von nur 14 Tagen geändert. Sobald ein Eigenheimbesitzer in Hessen über eine Solaranlage nachdenkt, bekommt er Anzeigen von Energietechnik Schermuly präsentiert." },
];

const mutations = CASES.map((c, i) => ({
  createOrReplace: {
    _id: `caseStudy-${c.key}`,
    _type: "caseStudy",
    name: c.name,
    role: c.role,
    location: c.location,
    branch: c.branch,
    result: c.result,
    text: c.text,
    order: i + 1,
  },
}));

console.log(`${CASES.length} Fallstudien vorbereitet.`);
if (!COMMIT) {
  console.log("Trockenlauf – nichts geschrieben. Mit SEED_COMMIT=1 erneut ausführen.");
  process.exit(0);
}

const res = await fetch(`${base}/data/mutate/${dataset}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations }),
});
if (!res.ok) {
  console.error(`Anlegen fehlgeschlagen: ${res.status} ${await res.text()}`);
  process.exit(1);
}
console.log(`✓ ${CASES.length} Fallstudien angelegt.`);
