import { client } from "./client";
import { isSanityConfigured } from "../env";
import {
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
} from "./queries";

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  author?: string;
  readingTime?: number;
  publishedAt: string;
  seoDescription?: string;
  coverUrl?: string;
  coverAlt?: string;
  authorImageUrl?: string;
};

export type Post = PostListItem & {
  body?: unknown[];
};

/** Beispiel-Artikel für den Demo-Modus (keine Sanity-Verbindung nötig). */
const DEMO_POSTS: Post[] = [
  {
    _id: "demo-1",
    title: "Wie Handwerksbetriebe 2026 planbar neue Kunden gewinnen",
    slug: "planbar-neue-kunden-handwerk",
    excerpt:
      "Schluss mit Auftragsflauten: Wie ein System aus Kampagnen und Landingpages verlässlich qualifizierte Anfragen liefert.",
    category: "Leadgenerierung",
    author: "Armin Hirschfeld",
    readingTime: 6,
    publishedAt: "2026-07-28T09:00:00Z",
    body: [
      block("Viele Handwerksbetriebe kennen das Auf und Ab: mal quillt der Auftragskalender über, dann folgt wieder eine Durststrecke. Der Grund ist selten die Nachfrage – es fehlt ein planbarer Weg, wie neue Anfragen entstehen."),
      heading("Der Kern: ein System statt Zufall"),
      block("Statt sich auf Empfehlungen und Zufall zu verlassen, kombiniert Leadfluss zielgerichtete Kampagnen mit optimierten Landingpages. So wird aus Werbebudget ein berechenbarer Zufluss an Anfragen."),
      heading("Drei Bausteine, die zusammenspielen"),
      block("Erstens die richtige Zielgruppe, zweitens eine Landingpage, die aus Besuchern Anfragen macht, und drittens eine schnelle Nachverfolgung. Fehlt ein Baustein, verpufft der Rest."),
    ],
  },
  {
    _id: "demo-2",
    title: "Landingpage statt Website: Warum der Unterschied über Anfragen entscheidet",
    slug: "landingpage-statt-website",
    excerpt:
      "Eine klassische Website informiert. Eine Landingpage konvertiert. Was das für deine Kampagnen bedeutet.",
    category: "Performance-Marketing",
    author: "Armin Hirschfeld",
    readingTime: 5,
    publishedAt: "2026-07-14T09:00:00Z",
    body: [
      block("Wer Anzeigen auf die Startseite seiner Website schickt, verschenkt Budget. Landingpages sind auf genau ein Ziel ausgerichtet: die qualifizierte Anfrage."),
      heading("Fokus schlägt Fülle"),
      block("Weniger Ablenkung, eine klare Botschaft und ein eindeutiger nächster Schritt – das hebt die Conversion-Rate spürbar an."),
    ],
  },
  {
    _id: "demo-3",
    title: "Case Study: 42 qualifizierte Anfragen in 30 Tagen für einen Dachdecker",
    slug: "case-study-dachdecker-anfragen",
    excerpt:
      "Von der ersten Kampagne bis zum vollen Auftragsbuch – so lief die Zusammenarbeit mit einem Betrieb aus dem Ruhrgebiet.",
    category: "Case Study",
    author: "Team Leadfluss",
    readingTime: 4,
    publishedAt: "2026-06-30T09:00:00Z",
    body: [
      block("Ausgangslage: ein etablierter Dachdeckerbetrieb mit gutem Ruf, aber schwankender Auslastung. Ziel: planbar neue Anfragen für Sanierungen."),
      heading("Ergebnis nach 30 Tagen"),
      block("42 qualifizierte Anfragen, davon 11 direkt terminierte Vor-Ort-Termine – bei einem überschaubaren Werbebudget."),
    ],
  },
];

function block(text: string) {
  const key = text.slice(0, 8).replace(/\s/g, "");
  return {
    _type: "block",
    _key: `b-${key}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s-${key}`, text, marks: [] }],
  };
}

function heading(text: string) {
  const key = text.slice(0, 8).replace(/\s/g, "");
  return {
    _type: "block",
    _key: `h-${key}`,
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: `hs-${key}`, text, marks: [] }],
  };
}

export async function getPosts(limit = 50): Promise<PostListItem[]> {
  if (!isSanityConfigured) {
    return DEMO_POSTS.map(({ body: _body, ...rest }) => rest);
  }
  return client.fetch(POSTS_QUERY, { limit });
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    return DEMO_POSTS.find((p) => p.slug === slug) ?? null;
  }
  return client.fetch(POST_BY_SLUG_QUERY, { slug });
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return DEMO_POSTS.map((p) => p.slug);
  }
  return client.fetch(POST_SLUGS_QUERY);
}
