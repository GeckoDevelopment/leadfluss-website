import type { Metadata } from "next";
import { Jost, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://leadfluss.de"),
  title: {
    default: "Leadfluss – Mit Videomarketing zur Nummer 1 in deiner Branche",
    template: "%s · Leadfluss",
  },
  description:
    "Leadfluss ist die Videomarketing-Agentur für den Mittelstand: Professionelle Werbevideos, die neue Kunden gewinnen und Arbeitsplätze attraktiver machen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${jost.variable} ${geistMono.variable} h-full antialiased`}
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
