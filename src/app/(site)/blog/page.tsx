import type { Metadata } from "next";
import { getPosts } from "@/sanity/lib/posts";
import { PostCard } from "@/components/site/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, Strategien und Case Studies rund um planbare Leadgenerierung für Handwerk und Mittelstand.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-signal">
          Blog
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Insights zur planbaren Leadgenerierung
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Strategien, Praxiswissen und Case Studies – damit aus Werbebudget
          verlässlich neue Kundenanfragen werden.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-16 text-muted-foreground">
          Noch keine Artikel veröffentlicht.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
