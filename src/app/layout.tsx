import type { Metadata } from "next";
import { Poppins, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Inter für Fließtext, Poppins für Headlines (Leadfluss-Markenschrift).
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leadfluss.de"),
  title: {
    default: "Leadfluss – Planbar neue Kunden für Handwerk & Mittelstand",
    template: "%s · Leadfluss",
  },
  description:
    "Leadfluss generiert planbar qualifizierte Anfragen für Handwerksbetriebe und den Mittelstand – über performante Kampagnen und optimierte Landingpages.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
