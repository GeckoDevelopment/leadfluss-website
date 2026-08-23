import type { Metadata } from "next";
import { Funnel } from "./funnel";

export const metadata: Metadata = {
  title: "Leadfluss anfragen",
  description:
    "Beantworte ein paar kurze Fragen und erhalte eine kostenlose, unverbindliche Potenzialanalyse für deinen Betrieb.",
};

export default function AnfragePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
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
  );
}
