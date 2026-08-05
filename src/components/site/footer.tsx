import Link from "next/link";
import { Logo } from "@/components/site/logo";

const FOOTER_COLUMNS = [
  {
    title: "Unternehmen",
    links: [
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/fallstudien", label: "Fallstudien" },
      { href: "/karriere", label: "Karriere" },
    ],
  },
  {
    title: "Ressourcen",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Videomarketing für den Mittelstand – professionelle Werbevideos,
              die neue Kunden gewinnen und Arbeitsplätze attraktiver machen.
            </p>
            <div className="mt-5 space-y-1 text-sm text-muted-foreground">
              <p>Standort Leipzig</p>
              <p>
                <a
                  href="mailto:info@leadfluss.de"
                  className="hover:text-foreground"
                >
                  info@leadfluss.de
                </a>
              </p>
              <p>
                <a href="tel:+4934160823338" className="hover:text-foreground">
                  +49 341 60823338
                </a>
              </p>
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Leadfluss. Alle Rechte vorbehalten.</p>
          <p>Made in Germany 🇩🇪</p>
        </div>
      </div>
    </footer>
  );
}
