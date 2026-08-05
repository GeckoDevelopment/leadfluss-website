import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getPost, getPostSlugs } from "@/sanity/lib/posts";
import { PortableText } from "@/components/site/portable-text";
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

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Zurück zum Blog
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {post.category && (
            <Badge className="bg-signal/12 text-[color:var(--signal-foreground)]">
              {post.category}
            </Badge>
          )}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
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
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        )}
        {post.author && (
          <p className="mt-6 text-sm font-medium text-foreground">
            Von {post.author}
          </p>
        )}
      </header>

      {post.coverUrl && (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-border bg-muted">
          <Image
            src={post.coverUrl}
            alt={post.coverAlt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-10">
        <PortableText value={post.body} />
      </div>

      <div className="mt-16 border border-border bg-muted/40 p-8 text-center">
        <h2 className="text-2xl font-semibold">
          Bereit für planbar neue Anfragen?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Lass uns in einem kostenlosen Gespräch klären, wie Leadfluss auch für
          deinen Betrieb funktioniert.
        </p>
        <Link
          href="/kontakt"
          className="mt-6 inline-flex h-11 items-center justify-center bg-signal px-6 text-sm font-medium text-[color:var(--signal-foreground)] transition-colors hover:bg-signal/85"
        >
          Termin anfragen
        </Link>
      </div>
    </article>
  );
}
