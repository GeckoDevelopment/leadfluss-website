# Leadfluss Website

Neugestaltung von [leadfluss.de](https://leadfluss.de) – helles Design mit
Signal-Grün `#00C281`, kantiger Komponenten-Stil (angelehnt an Cleverstart),
Blog über Sanity CMS.

## Stack

- **Next.js 16** (App Router, Turbopack, typisierte Routen)
- **Tailwind CSS 4** (CSS-first, Theme in `src/app/globals.css`)
- **shadcn** in der **Base-UI-Variante** (`style: base-nova`) – Komponenten in
  `src/components/ui`. Wichtig: `render`-Prop statt `asChild`.
- **Sanity** (`next-sanity`) – Blog/CMS, Studio unter `/studio`
- **Lucide** Icons, **Jost** (Headlines + Fließtext)

## Entwicklung

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Produktions-Build
```

## Design-System

Alle Farben, der kantige Stil (`--radius: 0`) und die `rounded-full`-Neutralisierung
liegen in [`src/app/globals.css`](src/app/globals.css).

- **Signal-Grün** `#00C281` (`--signal`, CTAs/Akzente)
- **Marken-Navy** `#232D44` (`--foreground`, Text/Headlines)
- Heller Hintergrund (weiß), optionaler `.dark`-Fallback vorhanden

## Blog / Sanity

Ohne Sanity-Zugang läuft der Blog im **Demo-Modus** (Beispielartikel aus
`src/sanity/lib/posts.ts`). Für Live-Betrieb:

1. Sanity-Projekt anlegen (`npx sanity@latest init` oder Konsole)
2. `.env.local` aus `.env.example` füllen (`NEXT_PUBLIC_SANITY_PROJECT_ID` …)
3. Redaktion unter `/studio` öffnen und Artikel pflegen

**Migration aus Webflow:** Der Webflow-CMS-Blog wird als CSV/JSON exportiert und
in Sanity importiert (`sanity dataset import` bzw. ein Import-Skript, das die
Felder auf das `post`-Schema mappt). Rich-Text wird zu Portable Text konvertiert.

## Struktur

```
src/
  app/
    (site)/          Marketing-Seiten (Navbar + Footer)
      page.tsx       Landingpage
      blog/          Blog-Übersicht + Detail
      kontakt/ …     weitere Seiten
    studio/          Sanity Studio (nur clientseitig, ssr:false)
  components/
    site/            Navbar, Footer, Logo, PostCard, PortableText …
    ui/              shadcn/Base-UI Komponenten
  sanity/            Schema, Client, Queries, Env
```
