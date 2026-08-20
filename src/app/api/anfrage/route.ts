import { NextResponse } from "next/server";

// Legt bei einer Formular-Einsendung automatisch einen Lead im Close-CRM an.
// Der API-Key wird ausschließlich serverseitig verwendet (nie im Browser).
export async function POST(req: Request) {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) {
    console.error("CLOSE_API_KEY ist nicht gesetzt.");
    return NextResponse.json(
      { ok: false, error: "CRM ist nicht konfiguriert." },
      { status: 500 },
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(data.name);
  const email = str(data.email);
  const phone = str(data.phone);
  const betrieb = str(data.betrieb);
  const auftraege = str(data.auftraege);
  const problem = str(data.problem);
  const ziel = str(data.ziel);

  // Name, E-Mail und Telefon sind Pflichtfelder.
  if (!name || !email || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name, E-Mail und Telefonnummer sind erforderlich." },
      { status: 400 },
    );
  }

  const leadName = name || "Website-Anfrage";

  // Close-Custom-Field "Leadquelle" (Auswahl) auf "Leadfluss Homepage" setzen.
  const LEADQUELLE_FIELD = "cf_efWeBZfygzeFR3j591GfIHEHas8wVzwOCsuijOKppTc";

  const lead = {
    name: leadName,
    [`custom.${LEADQUELLE_FIELD}`]: "Leadfluss Homepage",
    contacts: [
      {
        name: leadName,
        ...(email ? { emails: [{ email, type: "office" }] } : {}),
        phones: [{ phone, type: "mobile" }],
      },
    ],
  };

  // Close nutzt HTTP-Basic-Auth: API-Key als Benutzername, Passwort leer.
  const authHeader = "Basic " + Buffer.from(`${apiKey}:`).toString("base64");
  const headers = { Authorization: authHeader, "Content-Type": "application/json" };

  try {
    const res = await fetch("https://api.close.com/api/v1/lead/", {
      method: "POST",
      headers,
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Close-API-Fehler", res.status, body);
      return NextResponse.json(
        { ok: false, error: "Übertragung ans CRM fehlgeschlagen." },
        { status: 502 },
      );
    }

    // Notiz am Lead anlegen, damit alle Infos direkt sichtbar sind.
    const createdLead = (await res.json().catch(() => null)) as
      | { id?: string }
      | null;
    const leadId = createdLead?.id;
    if (leadId) {
      const details = [
        `Name: ${name || "—"}`,
        `Telefon: ${phone}`,
        `E-Mail: ${email || "—"}`,
        betrieb ? `Art des Betriebs: ${betrieb}` : null,
        auftraege ? `Aufträge pro Monat: ${auftraege}` : null,
        problem ? `Größtes Problem: ${problem}` : null,
        ziel ? `Unternehmerisches Ziel: ${ziel}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      const note = `Neuer Lead über die Leadfluss Homepage (Anfrageformular /anfrage).\n\n${details}`;
      try {
        const noteRes = await fetch(
          "https://api.close.com/api/v1/activity/note/",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ lead_id: leadId, note }),
          },
        );
        if (!noteRes.ok) {
          console.error("Close-Notiz-Fehler", noteRes.status, await noteRes.text());
        }
      } catch (noteErr) {
        // Notiz ist optional – der Lead selbst wurde bereits angelegt.
        console.error("Close-Notiz konnte nicht erstellt werden", noteErr);
      }
    }

    // Discord-Benachrichtigung (optional, blockiert die Antwort nicht).
    const discordUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordUrl) {
      try {
        await fetch(discordUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "🎉 Neuer Lead über die Homepage",
                ...(leadId
                  ? { url: `https://app.close.com/lead/${leadId}/` }
                  : {}),
                color: 0x00c281,
                fields: [
                  { name: "Name", value: name || "—", inline: true },
                  { name: "Telefon", value: phone, inline: true },
                  { name: "E-Mail", value: email || "—", inline: true },
                  { name: "Art des Betriebs", value: betrieb || "—", inline: true },
                  { name: "Aufträge/Monat", value: auftraege || "—", inline: true },
                  { name: "Ziel", value: ziel || "—", inline: true },
                  ...(problem
                    ? [{ name: "Größtes Problem", value: problem }]
                    : []),
                  ...(leadId
                    ? [
                        {
                          name: "🔗 CRM",
                          value: `[Lead in Close öffnen](https://app.close.com/lead/${leadId}/)`,
                        },
                      ]
                    : []),
                ],
                footer: { text: "Leadfluss · Anfrageformular" },
              },
            ],
          }),
        });
      } catch (discordErr) {
        console.error("Discord-Benachrichtigung fehlgeschlagen", discordErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Close-API nicht erreichbar", err);
    return NextResponse.json(
      { ok: false, error: "CRM aktuell nicht erreichbar." },
      { status: 502 },
    );
  }
}
