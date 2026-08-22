import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Gemeinsamer 404-Inhalt (ohne Navbar/Footer – die liefert das jeweilige Layout). */
export function NotFoundContent() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="font-heading text-7xl font-bold tracking-tight text-signal sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Diese Seite gibt es nicht
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Die von dir aufgerufene Seite existiert nicht, wurde verschoben oder ist
        nicht mehr verfügbar. Über die Startseite findest du alles Wichtige.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          render={
            <Link href="/">
              <Home />
              Zur Startseite
            </Link>
          }
        />
        <Button
          size="lg"
          variant="outline"
          render={
            <Link href="/anfrage-stellen">
              Erstgespräch buchen
              <ArrowRight />
            </Link>
          }
        />
      </div>
    </section>
  );
}
