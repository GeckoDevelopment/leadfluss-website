import type { Metadata } from "next";
import { Funnel } from "./funnel";

export const metadata: Metadata = {
  title: "Kostenlose Potenzialanalyse",
  description:
    "Beantworte ein paar kurze Fragen und erhalte eine kostenlose, unverbindliche Einschätzung für deinen Betrieb.",
  robots: { index: false, follow: false },
};

export default function AnalysePage() {
  return <Funnel />;
}
