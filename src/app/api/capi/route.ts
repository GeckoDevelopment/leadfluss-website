import { NextResponse } from "next/server";
import crypto from "node:crypto";

// Serverseitiges Meta-Tracking (Conversions API). Der Browser feuert einen
// First-Party-Beacon an diese Route; hier wird das Event server-zu-Meta
// gesendet – mit Zugriffstoken, IP, User-Agent und gehashten Nutzerdaten.
// Die Deduplizierung mit dem Browser-Pixel läuft über die geteilte event_id.

const GRAPH_VERSION = "v21.0";
const ALLOWED_EVENTS = new Set(["PageView", "Lead"]);

// SHA-256-Hash für personenbezogene Parameter (Meta-Vorgabe).
function hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

// Cookie-Wert aus dem Request-Header lesen.
function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  const match = header.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Marketing-Einwilligung aus dem lf_consent-Cookie prüfen.
function hasMarketingConsent(req: Request): boolean {
  const raw = getCookie(req, "lf_consent");
  if (!raw) return false;
  try {
    const c = JSON.parse(raw) as { marketing?: boolean };
    return c?.marketing === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) {
    console.error("META_PIXEL_ID oder META_CAPI_TOKEN ist nicht gesetzt.");
    // Tracking ist optional – kein Fehler an den Client.
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  // Ohne Marketing-Einwilligung wird nichts gesendet.
  if (!hasMarketingConsent(req)) {
    return NextResponse.json(
      { ok: false, skipped: "no-consent" },
      { status: 200 },
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "bad-request" },
      { status: 400 },
    );
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const eventName = str(data.eventName);
  const eventId = str(data.eventId);
  const eventSourceUrl = str(data.eventSourceUrl);
  const email = str(data.email);
  const phone = str(data.phone);

  if (!ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json(
      { ok: false, error: "unknown-event" },
      { status: 400 },
    );
  }

  // IP und User-Agent verbessern das Matching (bleiben unverschlüsselt).
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  // Vom Browser-Pixel gesetzte Cookies – zentral fürs Matching.
  const fbp = getCookie(req, "_fbp");
  const fbc = getCookie(req, "_fbc");

  const userData: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: userAgent,
  };
  // E-Mail: getrimmt + lowercase, dann gehasht.
  if (email) userData.em = [hash(email.toLowerCase())];
  // Telefon: nur Ziffern (inkl. Ländervorwahl), dann gehasht.
  if (phone) {
    const digits = phone.replace(/[^0-9]/g, "");
    if (digits) userData.ph = [hash(digits)];
  }
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId || undefined,
        event_source_url: eventSourceUrl || undefined,
        action_source: "website",
        user_data: userData,
      },
    ],
    // Nur zum Testen im Events Manager (Env-Variable optional).
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      console.error("Meta-CAPI-Fehler", res.status, await res.text());
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Meta-CAPI nicht erreichbar", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
