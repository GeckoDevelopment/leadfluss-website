/**
 * Legt einen Mitarbeiter (teamMember) im Leadfluss-Sanity an und lädt sein
 * Foto als Bild-Asset hoch.
 *
 * Erfordert in .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_WRITE_TOKEN.
 *
 * Aufruf (Foto optional):
 *   TM_NAME="Armin Hirschfeld" TM_ROLE="Strategieberater" TM_ORDER=1 \
 *   TM_IMAGE="/pfad/zum/foto.jpg" node scripts/add-team-member.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";

const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim();
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN fehlen (in .env.local setzen).");
  process.exit(1);
}

const name = process.env.TM_NAME;
const role = process.env.TM_ROLE;
const order = process.env.TM_ORDER ? Number(process.env.TM_ORDER) : undefined;
const imagePath = process.env.TM_IMAGE;
if (!name || !role) {
  console.error("TM_NAME und TM_ROLE sind erforderlich.");
  process.exit(1);
}

const base = `https://${projectId}.api.sanity.io/v2024-10-01`;
const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const docId = `teamMember-${slug}`;

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };

let imageField;
if (imagePath) {
  if (!existsSync(imagePath)) {
    console.error(`Foto nicht gefunden: ${imagePath}`);
    process.exit(1);
  }
  const buf = readFileSync(imagePath);
  const ct = MIME[extname(imagePath).toLowerCase()] || "application/octet-stream";
  const up = await fetch(`${base}/assets/images/${dataset}?filename=${encodeURIComponent(basename(imagePath))}`, {
    method: "POST",
    headers: { "Content-Type": ct, Authorization: `Bearer ${token}` },
    body: buf,
  });
  if (!up.ok) {
    console.error(`Foto-Upload fehlgeschlagen: ${up.status} ${await up.text()}`);
    process.exit(1);
  }
  const assetId = (await up.json()).document._id;
  imageField = { _type: "image", asset: { _type: "reference", _ref: assetId } };
  console.log("✓ Foto hochgeladen:", assetId);
}

const doc = { _id: docId, _type: "teamMember", name, role };
if (order !== undefined) doc.order = order;
if (imageField) doc.image = imageField;

const res = await fetch(`${base}/data/mutate/${dataset}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
});
if (!res.ok) {
  console.error(`Anlegen fehlgeschlagen: ${res.status} ${await res.text()}`);
  process.exit(1);
}
console.log(`✓ Mitarbeiter angelegt: ${name} (${role})${imageField ? " inkl. Foto" : " ohne Foto"} -> ${docId}`);
