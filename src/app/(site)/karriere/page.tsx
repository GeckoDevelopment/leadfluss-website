import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Karriere",
  description: "Werde Teil von Leadfluss – Performance-Marketing für Handwerk und Mittelstand.",
};

export default function KarrierePage() {
  return (
    <>
      <PageHeader
        eyebrow="Karriere"
        title="Werde Teil von Leadfluss"
        description="Wir wachsen – und suchen Menschen, die planbare Ergebnisse genauso lieben wie wir."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-lg text-muted-foreground">
          Aktuell sind keine Stellen ausgeschrieben. Du glaubst trotzdem, dass
          du zu uns passt? Dann schreib uns eine Initiativbewerbung – wir freuen
          uns über Talente.
        </p>
        <div className="mt-8">
          <Button render={<Link href="/anfrage">Initiativ bewerben</Link>} />
        </div>
      </div>
    </>
  );
}
