import type { Metadata } from "next";
import { Jost, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { ConsentMode } from "@/components/site/consent-mode";
import "./globals.css";

// Jost für die gesamte Website (Headlines + Fließtext), Variable Font.
const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_TITLE =
  "Leadfluss – Branchenpartner für das Handwerk – Für Fachbetriebe rund ums Haus";
const DEFAULT_DESCRIPTION =
  "Leadfluss ist die Videomarketing-Agentur für den Mittelstand: Professionelle Werbevideos, die neue Kunden gewinnen und Arbeitsplätze attraktiver machen.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leadfluss.de"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Leadfluss",
  },
  description: DEFAULT_DESCRIPTION,
  manifest: "/site.webmanifest",
  // Social-Vorschau (WhatsApp, LinkedIn, X …). Einzelne Seiten überschreiben
  // Titel/Beschreibung; Bild und Grunddaten werden vererbt.
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Leadfluss",
    url: "https://www.leadfluss.de",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Leadfluss – Videomarketing für den Mittelstand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${jost.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="GTM-NQ548643" />
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        {/* Consent Mode v2: setzt per beforeInteractive-Script VOR dem GTM alle
            Einwilligungs-Signale auf "denied". Next.js hoistet das Script in den
            <head>; die Ausführung erfolgt garantiert vor dem afterInteractive-
            GTM-Loader. */}
        <ConsentMode />
        {children}
      </body>
    </html>
  );
}
