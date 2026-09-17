import { ImageResponse } from "next/og";

// Generiertes Social-Vorschaubild (WhatsApp, LinkedIn, X …) für /franchise.
// Ersetzt für diese Seite das Standard-OG-Bild durch eine eigene, gebrandete
// Grafik mit Franchise-Botschaft.

export const alt =
  "Als Franchise- oder Lizenzgeber planbar neue Partner gewinnen – Leadfluss";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#232D44",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marke */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          Leadfluss
        </div>

        {/* Botschaft */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#00c281",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Für Franchise- & Lizenzgeber
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Planbar neue Franchisepartner gewinnen
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.72)",
              marginTop: 24,
              lineHeight: 1.35,
            }}
          >
            Mit regionalem Videomarketing – ohne teure Portale oder hohe
            Provisionen.
          </div>
        </div>

        {/* Fuß */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 600,
            color: "#00c281",
          }}
        >
          leadfluss.de
        </div>
      </div>
    ),
    { ...size },
  );
}
