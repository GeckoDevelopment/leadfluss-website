/**
 * Import von Kundenvideos aus einer Tabelle (CSV) nach Mux + Sanity.
 *
 * Pro Zeile: Video liegt in Google Drive -> wird zu Mux hochgeladen ->
 * in Sanity wird ein "Kundenvideo" mit Firma + Branche angelegt.
 * Der Rechner lädt das Video NICHT herunter: Mux holt es direkt von der
 * Drive-Freigabe-URL (Datei muss "Jeder mit dem Link" freigegeben sein).
 *
 * Tabelle (Spalten, mit Semikolon getrennt):
 *   drive_link ; videoname ; firma ; branche
 *
 * Aufruf:
 *   Trockenlauf (prüft nur, schreibt nichts):
 *     node scripts/import-kundenvideos.mjs pfad/zur/tabelle.csv
 *   Echt importieren:
 *     IMPORT_COMMIT=1 node scripts/import-kundenvideos.mjs pfad/zur/tabelle.csv
 *
 * Nötige Umgebungsvariablen (.env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 *   MUX_TOKEN_ID, MUX_TOKEN_SECRET   (aus dem Mux-Dashboard, Berechtigung "Mux Video")
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// --- .env.local laden ---------------------------------------------------
const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim();
  }
}

const COMMIT = process.env.IMPORT_COMMIT === "1";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const sanityToken = process.env.SANITY_API_WRITE_TOKEN;
const muxId = process.env.MUX_TOKEN_ID;
const muxSecret = process.env.MUX_TOKEN_SECRET;

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("Bitte Pfad zur Tabelle angeben, z. B.:\n  node scripts/import-kundenvideos.mjs meine-tabelle.csv");
  process.exit(1);
}

const missing = [];
if (!projectId) missing.push("NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!sanityToken) missing.push("SANITY_API_WRITE_TOKEN");
if (COMMIT && !muxId) missing.push("MUX_TOKEN_ID");
if (COMMIT && !muxSecret) missing.push("MUX_TOKEN_SECRET");
if (missing.length) {
  console.error("Fehlende Umgebungsvariablen (.env.local): " + missing.join(", "));
  process.exit(1);
}

// Erlaubte Branchen – muss zu src/lib/video-branches.ts passen.
const BRANCHEN = [
  "Photovoltaik", "Wärmepumpe", "Bauelemente", "Treppenlifte", "Badsanierung",
  "Küchenstudios", "Hausbaufirmen", "Terrassendächer", "Handwerk", "Franchisesysteme",
];

const sanityBase = `https://${projectId}.api.sanity.io/v2024-10-01`;
const muxAuth = "Basic " + Buffer.from(`${muxId}:${muxSecret}`).toString("base64");

// --- Hilfsfunktionen ----------------------------------------------------
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];
  const header = lines[0].split(";").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line, i) => {
    const cells = line.split(";").map((c) => c.trim().replace(/^"|"$/g, ""));
    const row = { _zeile: i + 2 };
    header.forEach((h, idx) => (row[h] = cells[idx] ?? ""));
    return row;
  });
}

function driveFileId(link) {
  return (
    link.match(/\/file\/d\/([^/]+)/)?.[1] ||
    link.match(/[?&]id=([^&]+)/)?.[1] ||
    null
  );
}

function driveDirectUrl(fileId) {
  return `https://drive.google.com/uc?export=download&confirm=t&id=${fileId}`;
}

function slug(s) {
  return s.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");
}

async function sanityQuery(query) {
  const url = `${sanityBase}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${sanityToken}` } });
  if (!res.ok) throw new Error(`Sanity-Query fehlgeschlagen: ${res.status} ${await res.text()}`);
  return (await res.json()).result;
}

async function sanityMutate(mutations) {
  const res = await fetch(`${sanityBase}/data/mutate/${dataset}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${sanityToken}` },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(`Sanity-Schreiben fehlgeschlagen: ${res.status} ${await res.text()}`);
  return res.json();
}

async function muxCreateAsset(inputUrl) {
  const res = await fetch("https://api.mux.com/video/v1/assets", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: muxAuth },
    body: JSON.stringify({ input: [{ url: inputUrl }], playback_policy: ["public"] }),
  });
  if (!res.ok) throw new Error(`Mux-Upload fehlgeschlagen: ${res.status} ${await res.text()}`);
  return (await res.json()).data;
}

async function muxWaitReady(assetId, { tries = 60, delayMs = 5000 } = {}) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(`https://api.mux.com/video/v1/assets/${assetId}`, {
      headers: { Authorization: muxAuth },
    });
    if (!res.ok) throw new Error(`Mux-Status fehlgeschlagen: ${res.status} ${await res.text()}`);
    const a = (await res.json()).data;
    if (a.status === "ready") return a;
    if (a.status === "errored") throw new Error(`Mux konnte das Video nicht verarbeiten: ${JSON.stringify(a.errors)}`);
    await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error("Mux ist auch nach mehreren Minuten nicht 'ready' – später erneut prüfen.");
}

// --- Tabelle einlesen & validieren --------------------------------------
if (!existsSync(csvPath)) {
  console.error(`Tabelle nicht gefunden: ${csvPath}`);
  process.exit(1);
}
const rows = parseCsv(readFileSync(csvPath, "utf-8"));
if (rows.length === 0) {
  console.error("Tabelle enthält keine Datenzeilen.");
  process.exit(1);
}

// Bestehende Firmen laden (Name -> _id)
const companies = await sanityQuery(`*[_type == "company"]{_id, name}`);
const companyByName = new Map(companies.map((c) => [c.name.trim().toLowerCase(), c._id]));

const geplant = [];
const fehler = [];
for (const row of rows) {
  const { drive_link, videoname, firma, branche, _zeile } = row;
  const probleme = [];
  const fileId = driveFileId(drive_link || "");
  if (!fileId) probleme.push("Drive-Link nicht erkannt");
  if (!videoname) probleme.push("videoname fehlt");
  if (!branche || !BRANCHEN.includes(branche))
    probleme.push(`branche ungültig (erlaubt: ${BRANCHEN.join(", ")})`);
  const companyId = companyByName.get((firma || "").trim().toLowerCase());
  if (!companyId) probleme.push(`Firma "${firma}" nicht in Sanity gefunden`);

  if (probleme.length) {
    fehler.push(`Zeile ${_zeile}: ${probleme.join(" · ")}`);
  } else {
    geplant.push({ fileId, videoname, firma, branche, companyId, zeile: _zeile });
  }
}

console.log(`\n${rows.length} Zeile(n) gelesen – ${geplant.length} importierbar, ${fehler.length} mit Problemen.`);
if (fehler.length) console.log("\nProbleme:\n  " + fehler.join("\n  "));

if (!COMMIT) {
  console.log("\nTrockenlauf – es wurde nichts hochgeladen/gespeichert.");
  console.log("Zum echten Import erneut mit  IMPORT_COMMIT=1  ausführen.");
  process.exit(fehler.length ? 1 : 0);
}
if (geplant.length === 0) {
  console.error("\nNichts importierbar. Bitte Probleme oben beheben.");
  process.exit(1);
}

// --- Echter Import ------------------------------------------------------
let ok = 0;
for (const v of geplant) {
  const videoDocId = `kundenvideo-drive-${v.fileId}`;
  // Schon importiert? (idempotent)
  const exists = await sanityQuery(`count(*[_id == "${videoDocId}"])`);
  if (exists > 0) {
    console.log(`↷ Zeile ${v.zeile}: "${v.videoname}" bereits importiert – übersprungen.`);
    ok++;
    continue;
  }

  console.log(`\n→ Zeile ${v.zeile}: "${v.videoname}" (${v.firma}) wird zu Mux hochgeladen …`);
  const created = await muxCreateAsset(driveDirectUrl(v.fileId));
  const ready = await muxWaitReady(created.id);
  const playbackId = ready.playback_ids?.find((p) => p.policy === "public")?.id
    || ready.playback_ids?.[0]?.id;
  console.log(`  ✓ Mux fertig (Playback-ID ${playbackId})`);

  const assetDocId = `muxasset-${ready.id}`;
  await sanityMutate([
    {
      createOrReplace: {
        _id: assetDocId,
        _type: "mux.videoAsset",
        assetId: ready.id,
        playbackId,
        status: "ready",
        filename: v.videoname,
        data: ready,
      },
    },
    {
      createIfNotExists: {
        _id: videoDocId,
        _type: "muxVideo",
        title: v.videoname,
        industry: v.branche,
        company: { _type: "reference", _ref: v.companyId },
        video: {
          _type: "mux.video",
          asset: { _type: "reference", _weak: true, _ref: assetDocId },
        },
      },
    },
  ]);
  console.log(`  ✓ In Sanity als Kundenvideo angelegt.`);
  ok++;
}

console.log(`\nFertig: ${ok}/${geplant.length} importiert.`);
if (fehler.length) console.log(`${fehler.length} Zeile(n) hatten Probleme (siehe oben) und wurden ausgelassen.`);
