import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/site/logo";
import { Funnel } from "@/components/site/funnel";

export const metadata: Metadata = {
  title: "Leadfluss anfragen",
  description:
    "Beantworte ein paar kurze Fragen und erhalte eine kostenlose, unverbindliche Potenzialanalyse für deinen Betrieb.",
};

export default function AnfragePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-muted/40">
      {/* Dezentes Hintergrundbild (Armin & Friedrich), oben und unten weich
          ausgeblendet */}
      <Image
        src="/armin-friedrich-plan.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-0 object-cover"
        style={{
          opacity: 0.18,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-background/40" />

      {/* Logo oben mittig */}
      <header className="relative z-10 flex justify-center px-4 pt-10 pb-8 sm:pt-14">
        <Link href="/" aria-label="Leadfluss Startseite">
          <Logo className="h-11 w-auto" />
        </Link>
      </header>

      {/* Funnel */}
      <main className="relative z-10 flex-1 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <Funnel />
        </div>
      </main>

      {/* Unauffällige Rechtslinks unten */}
      <footer className="relative z-10 flex justify-center gap-6 px-4 py-8 text-sm text-muted-foreground">
        <Link
          href="/impressum"
          className="transition-colors hover:text-foreground"
        >
          Impressum
        </Link>
        <Link
          href="/datenschutz"
          className="transition-colors hover:text-foreground"
        >
          Datenschutz
        </Link>
      </footer>
    </div>
  );
}
