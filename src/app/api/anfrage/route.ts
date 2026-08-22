import { NextResponse } from "next/server";

// Nimmt eine Formular-Einsendung entgegen und leitet den Lead an den
// n8n-Webhook weiter. Die weitere Verarbeitung (Close-CRM, Discord-Nachricht
// usw.) übernimmt der n8n-Workflow – nicht mehr diese Route.
export async function POST(req: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL ist nicht gesetzt.");
    return NextResponse.json(
      { ok: false, error: "Formular ist nicht konfiguriert." },
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

  const payload = {
    source: "Leadfluss Homepage",
    form: "anfrage",
    name,
    email,
    phone,
    betrieb,
    auftraege,
    problem,
    ziel,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("n8n-Webhook-Fehler", res.status, body);
      return NextResponse.json(
        { ok: false, error: "Übertragung fehlgeschlagen." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("n8n-Webhook nicht erreichbar", err);
    return NextResponse.json(
      { ok: false, error: "Dienst aktuell nicht erreichbar." },
      { status: 502 },
    );
  }
}
