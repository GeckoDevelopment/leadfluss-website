import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Sichere dir ein kostenloses Erstgespräch – wir melden uns innerhalb von 24 Stunden.",
};

const CONTACT_ITEMS = [
  { icon: Mail, label: "E-Mail", value: "info@leadfluss.de", href: "mailto:info@leadfluss.de" },
  { icon: Phone, label: "Telefon", value: "+49 341 60823338", href: "tel:+4934160823338" },
  { icon: Clock, label: "Geschäftszeiten", value: "Mo–Fr, 8:00 bis 18:00 Uhr" },
  { icon: MapPin, label: "Standort", value: "Leipzig – deutschlandweit im Einsatz" },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Lass uns über deinen Anfragenfluss sprechen"
        description="Kostenloses Erstgespräch, ehrliche Einschätzung, keine Verpflichtung. Wir melden uns innerhalb von 24 Stunden."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">Direkt erreichbar</h2>
            <p className="mt-3 text-muted-foreground">
              Schreib uns oder ruf an – oder fülle einfach das Formular aus.
            </p>
            <ul className="mt-8 space-y-6">
              {CONTACT_ITEMS.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="flex size-11 items-center justify-center bg-icon-bg text-signal">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-foreground hover:text-signal"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-medium text-foreground">
                        {item.value}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Google Maps – Standort Leadfluss */}
            <div className="mt-10 aspect-[4/3] w-full overflow-hidden border border-border bg-muted">
              <iframe
                loading="lazy"
                src="https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1sLeadfluss!5e0!6i12"
                title="Leadfluss"
                aria-label="Leadfluss"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
          <div className="border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
