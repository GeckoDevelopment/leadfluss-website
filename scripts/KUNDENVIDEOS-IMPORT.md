# Kundenvideos importieren (aus Google Drive)

So kommen viele Videos auf einmal in die Galerie `/kundenvideos` – ohne sie
herunterzuladen. Ablauf in Kürze:

**Tabelle ausfüllen → Videos in Drive freigeben → Skript starten.** Fertig.

---

## Schritt 1 – Tabelle ausfüllen

Vorlage: `scripts/kundenvideos-import.example.csv`. Kopiere sie (z. B. als
`meine-videos.csv`) und trage pro Video eine Zeile ein. Spalten (mit **Semikolon**
`;` getrennt – so speichert Excel/Google Sheets „CSV" automatisch):

| Spalte | Bedeutung |
|---|---|
| `drive_link` | Der Freigabe-Link des Videos aus Google Drive |
| `videoname` | Frei wählbarer Name (danach wird auch gesucht) |
| `firma` | **Exakt** wie die Firma in Sanity heißt (Bestandskunde) |
| `branche` | Eine aus: Photovoltaik, Wärmepumpe, Bauelemente, Treppenlifte, Badsanierung, Küchenstudios, Hausbaufirmen, Terrassendächer, Handwerk, Franchisesysteme |

> Tipp: Am bequemsten in Google Sheets pflegen und dann
> „Datei → Herunterladen → Komma-getrennte Werte (.csv)".

## Schritt 2 – Videos in Google Drive freigeben

Jedes Video (oder der ganze Ordner) muss auf **„Jeder, der über den Link
verfügt"** freigegeben sein – nur so kann Mux es abholen. In Drive:
Rechtsklick aufs Video → „Freigeben" → „Jeder mit dem Link" → Link kopieren →
in die Spalte `drive_link` einfügen.

## Schritt 3 – Zugänge einmalig hinterlegen

In der Datei `.env.local` müssen stehen (Werte vom Admin):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=…
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=…
MUX_TOKEN_ID=…
MUX_TOKEN_SECRET=…
```

Die Mux-Werte kommen aus dem Mux-Dashboard: **Settings → Access Tokens →
Generate new token** (Berechtigung „Mux Video").

## Schritt 4 – Erst testen, dann importieren

**Trockenlauf** (prüft nur die Tabelle, lädt/speichert nichts):

```
node scripts/import-kundenvideos.mjs meine-videos.csv
```

Er meldet, welche Zeilen in Ordnung sind und wo etwas fehlt (z. B. Firma nicht
gefunden, Branche falsch geschrieben). Erst wenn alles passt:

**Echter Import:**

```
IMPORT_COMMIT=1 node scripts/import-kundenvideos.mjs meine-videos.csv
```

Das Skript lädt jedes Video zu Mux, wartet bis es fertig verarbeitet ist, und
legt in Sanity das Kundenvideo mit Firma + Branche an. Danach erscheinen die
Videos auf `/kundenvideos`. Der Import ist **wiederholbar**: schon importierte
Videos werden übersprungen – du kannst die Tabelle also später erweitern und
erneut starten.

---

## Gut zu wissen

- **Sehr große Videos:** Google Drive zeigt bei großen Dateien manchmal eine
  „Download bestätigen"-Zwischenseite. Falls Mux ein Video dadurch nicht holen
  kann, meldet das Skript einen Fehler für diese Zeile – dann sag Bescheid,
  dann rüsten wir den robusteren Weg (direkter Drive-Zugriff) nach.
- **Firmennamen** müssen exakt zum Sanity-Eintrag passen. Fehlt eine Firma,
  zuerst im Studio anlegen (oder Schreibweise in der Tabelle korrigieren).
- Es werden nur **öffentliche** Mux-Wiedergaben erzeugt (zum Abspielen auf der
  Website nötig).
