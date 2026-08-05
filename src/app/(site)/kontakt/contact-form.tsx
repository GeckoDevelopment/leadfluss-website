"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  // TODO: An echten Endpunkt anbinden (z. B. Resend / Sanity-Submission).
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="flex size-14 items-center justify-center bg-signal/15 text-signal">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Danke für deine Anfrage!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Wir haben deine Nachricht erhalten und melden uns innerhalb von 24
          Stunden bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Max Mustermann" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Betrieb</Label>
          <Input id="company" name="company" placeholder="Muster GmbH" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="max@betrieb.de"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" type="tel" placeholder="0123 456789" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Nachricht</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Worum geht es? Welche Leistungen bietest du an?"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        Anfrage senden
      </Button>
      <p className="text-xs text-muted-foreground">
        Mit dem Absenden stimmst du unserer{" "}
        <a href="/datenschutz" className="underline hover:text-foreground">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
