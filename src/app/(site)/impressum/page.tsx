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
          <div>
            <h2 className="text-lg font-semibold">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2 text-muted-foreground">
              Leadfluss GmbH
              <br />
              Rückertstraße 4
              <br />
              04157 Leipzig
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Kontakt</h2>
            <p className="mt-2 text-muted-foreground">
              E-Mail: info@leadfluss.de
              <br />
              Telefon: +49 341 60823338
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
