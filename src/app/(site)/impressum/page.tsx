import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader title="Impressum" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="space-y-6 text-foreground/90">
          <p className="text-muted-foreground">
            Platzhalter – bitte mit den echten Angaben gemäß § 5 TMG befüllen.
          </p>
          <div>
            <h2 className="text-lg font-semibold">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2 text-muted-foreground">
              Leadfluss
              <br />
              [Straße & Hausnummer]
              <br />
              [PLZ Ort]
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Kontakt</h2>
            <p className="mt-2 text-muted-foreground">
              E-Mail: hallo@leadfluss.de
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
