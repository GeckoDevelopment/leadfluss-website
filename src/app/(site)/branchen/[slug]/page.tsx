import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Target, MousePointerClick, PhoneCall, LineChart } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { BRANCHEN, getBranche } from "@/lib/branchen";

export function generateStaticParams() {
  return BRANCHEN.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/branchen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const branche = getBranche(slug);
  if (!branche) return { title: "Branche nicht gefunden" };
  return {
    title: `${branche.label} – Neukunden gewinnen`,
    description: branche.description,
  };
}

const STEPS = [
  {
    icon: Target,
    title: "Kampagnen-Management",
    text: "Meta & Google Ads, die exakt die richtige Zielgruppe in deiner Region erreichen.",
  },
  {
    icon: MousePointerClick,
    title: "Landingpage-Erstellung",
    text: "Conversion-optimierte Seiten, die aus Klicks echte Anfragen machen.",
  },
  {
    icon: PhoneCall,
    title: "Lead-Qualifizierung",
    text: "Vorqualifizierung, damit nur ernsthafte Interessenten bei dir ankommen.",
  },
  {
    icon: LineChart,
    title: "Reporting & Optimierung",
    text: "Transparentes Dashboard mit allen Zahlen – du siehst jederzeit, was dein Budget bringt.",
  },
];

export default async function BranchePage({
  params,
}: PageProps<"/branchen/[slug]">) {
  const { slug } = await params;
  const branche = getBranche(slug);
  if (!branche) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Branche"
        title={`Neukunden für ${branche.label}`}
        description={branche.description}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {STEPS.map((s) => (
            <div key={s.title} className="border border-border bg-card p-8">
              <span className="flex size-12 items-center justify-center bg-icon-bg text-signal">
                <s.icon className="size-6" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            size="lg"
            render={<Link href="/kontakt">Anfrage für {branche.label} stellen</Link>}
          />
        </div>
      </div>
    </>
  );
}
