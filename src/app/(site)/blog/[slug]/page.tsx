import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getPost, getPostSlugs } from "@/sanity/lib/posts";
import { PortableText } from "@/components/site/portable-text";
import {
  TableOfContents,
  type TocHeading,
} from "@/components/site/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artikel nicht gefunden" };
  return {
    title: post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: post.coverUrl ? { images: [post.coverUrl] } : undefined,
  };
}

type PortableBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: { text?: string }[];
};

// Autor (aktuell einheitlich); Rolle wird unter dem Namen angezeigt.
const AUTHOR_ROLE = "Experte für Leadgenerierung";

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Überschriften (H2/H3) fürs Inhaltsverzeichnis – IDs decken sich mit den
  // im PortableText-Renderer vergebenen `h-<_key>`-IDs.
  const headings: TocHeading[] = ((post.body as PortableBlock[] | undefined) ?? [])
    .filter(
      (b) => b._type === "block" && (b.style === "h2" || b.style === "h3") && b._key,
    )
    .map((b) => ({
      id: `h-${b._key}`,
      text: (b.children ?? []).map((c) => c.text ?? "").join("").trim(),
      level: b.style === "h3" ? 3 : 2,
    }))
    .filter((h) => h.text.length > 0);

  const authorName = post.author || "Armin Hirschfeld";
  const authorInitials = authorName
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <article>
      {/* Kopfbereich: zweispaltig – Text links, Beitragsbild rechts. */}
      <header className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Zurück zum Blog
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {post.category && (
                  <Badge className="bg-signal/12 text-[color:var(--signal-foreground)]">
                    {post.category}
                  </Badge>
                )}
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.readingTime && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-4" />
                    {post.readingTime} Min. Lesezeit
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-lg text-muted-foreground">
                  {post.excerpt}
                </p>
              )}

              {/* Autor */}
              <div className="mt-8 flex items-center gap-3">
                {post.authorImageUrl ? (
                  <Image
                    src={post.authorImageUrl}
                    alt={authorName}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-12 items-center justify-center rounded-full bg-signal/12 text-sm font-semibold text-signal">
                    {authorInitials}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Geschrieben von {authorName}
                  </p>
                  <p className="text-sm text-muted-foreground">{AUTHOR_ROLE}</p>
                </div>
              </div>
            </div>

            {post.coverUrl && (
              <div className="relative aspect-square w-full overflow-hidden border border-border bg-muted">
                <Image
                  src={post.coverUrl}
                  alt={post.coverAlt ?? post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobil/Tablet: statisches Inhaltsverzeichnis zentral unter dem Kopf. */}
      {headings.length >= 2 && (
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 xl:hidden">
          <div className="border border-border bg-muted/30 p-5">
            <TableOfContents headings={headings} />
          </div>
        </div>
      )}

      {/* Inhalt + schwebendes Inhaltsverzeichnis (Desktop) */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12">
          <div className="mx-auto max-w-3xl xl:mx-0">
            <PortableText value={post.body} />

            <div className="relative mt-16 overflow-hidden border border-border">
              {/* Hintergrundbild + dunkles Overlay für lesbaren Text. */}
              <Image
                src="/hero-team.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[color:var(--foreground)]/80" />
              <div className="relative px-6 py-14 text-center sm:px-10">
                <h2 className="text-2xl font-semibold text-white">
                  Bereit für planbar neue Anfragen?
                </h2>
                <p className="mx-auto mt-2 max-w-md text-white/85">
                  Lass uns in einem kostenlosen Gespräch klären, wie Leadfluss
                  auch für deinen Betrieb funktioniert.
                </p>
                <Link
                  href="/anfrage-stellen"
                  className="mt-6 inline-flex h-11 items-center justify-center bg-signal px-6 text-sm font-medium text-white transition-colors hover:bg-signal/85"
                >
                  Termin anfragen
                </Link>
              </div>
            </div>
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
