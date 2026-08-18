"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { BRANCHEN } from "@/lib/branchen";
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

function BranchenDropdown() {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Kleiner Verzögerungspuffer, damit das Menü beim Weg­wandern der Maus
  // zwischen Trigger und Panel nicht sofort zuklappt.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  React.useEffect(() => cancelClose, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={cn(linkClass, "inline-flex items-center gap-1")}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        Branchen
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3",
          open ? "block" : "hidden"
        )}
      >
        <ul
          role="menu"
          className="overflow-hidden rounded-xl border border-border bg-header p-2 shadow-lg"
        >
          {BRANCHEN.map((branche) => (
            <li key={branche.slug} role="none">
              <Link
                role="menuitem"
                href={`/branchen/${branche.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-icon-bg text-signal">
                  <branche.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-header-foreground">
                    {branche.label}
                  </span>
                  <span className="block text-xs text-header-foreground/60">
                    {branche.teaser}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [branchenOpen, setBranchenOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-header/90 backdrop-blur supports-[backdrop-filter]:bg-header/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Leadfluss Startseite">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <BranchenDropdown />
          {NAV_LINKS.map((link) => (
            <NavLinkItem key={link.href} link={link} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button render={<Link href="/kontakt">Leadfluss anfragen</Link>} />
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
          <button
            type="button"
            className="flex items-center justify-between px-2 py-2.5 text-sm font-medium text-header-foreground/80 transition-colors hover:text-header-foreground"
            aria-expanded={branchenOpen}
            onClick={() => setBranchenOpen((v) => !v)}
          >
            Branchen
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                branchenOpen && "rotate-180"
              )}
            />
          </button>
          <div className={cn("flex flex-col", branchenOpen ? "flex" : "hidden")}>
            {BRANCHEN.map((branche) => (
              <Link
                key={branche.slug}
                href={`/branchen/${branche.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg py-2 pl-4 pr-2 text-sm text-header-foreground/70 transition-colors hover:bg-muted hover:text-header-foreground"
              >
                <branche.icon className="size-4 text-signal" />
                {branche.label}
              </Link>
            ))}
          </div>

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
              <Link href="/kontakt" onClick={() => setOpen(false)}>
                Leadfluss anfragen
              </Link>
            }
          />
        </nav>
      </div>
    </header>
  );
}
