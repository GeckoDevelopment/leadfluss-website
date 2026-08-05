import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader title="Datenschutzerklärung" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-muted-foreground">
          Platzhalter – bitte durch eine vollständige, DSGVO-konforme
          Datenschutzerklärung ersetzen (z. B. via Anwalt oder Generator).
        </p>
      </div>
    </>
  );
}
