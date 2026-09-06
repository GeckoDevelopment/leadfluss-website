import type { Metadata } from "next";
import Image from "next/image";
import { Funnel } from "./funnel";

export const metadata: Metadata = {
  title: "Leadfluss anfragen",
  description:
    "Beantworte ein paar kurze Fragen und erhalte eine kostenlose, unverbindliche Potenzialanalyse für deinen Betrieb.",
};

export default function AnfragePage() {
  return (
    <section className="relative overflow-hidden bg-muted/40">
      {/* Dezentes Hintergrundbild (Armin & Friedrich), oben und unten weich ausgeblendet */}
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
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-signal">
            Kostenlose Potenzialanalyse
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            In 2 Minuten zu deiner Einschätzung
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Beantworte ein paar kurze Fragen – im Anschluss meldet sich ein
            Mitarbeiter mit einer unverbindlichen Potenzialanalyse für deinen
            Betrieb.
          </p>
        </div>
        <div className="mt-10">
          <Funnel />
        </div>
      </div>
    </section>
  );
}
