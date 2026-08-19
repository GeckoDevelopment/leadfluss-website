"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/fallstudien", label: "Fallstudien" },
  { href: "/blog", label: "Blog" },
  { href: "https://karriere.leadfluss.de/", label: "Karriere", external: true },
  { href: "/faq", label: "FAQ" },
];

const linkClass =
  "text-sm font-medium text-header-foreground/80 transition-colors hover:text-header-foreground";

function NavLinkItem({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-header/90 backdrop-blur supports-[backdrop-filter]:bg-header/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Leadfluss Startseite">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLinkItem key={link.href} link={link} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button render={<Link href="/analyse">Leadfluss anfragen</Link>} />
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center text-header-foreground md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-header md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-header-foreground/80 transition-colors hover:bg-muted hover:text-header-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-header-foreground/80 transition-colors hover:bg-muted hover:text-header-foreground"
              >
                {link.label}
              </Link>
            )
          )}
          <Button
            className="mt-2 w-full"
            render={
              <Link href="/analyse" onClick={() => setOpen(false)}>
                Leadfluss anfragen
              </Link>
            }
          />
        </nav>
      </div>
    </header>
  );
}
