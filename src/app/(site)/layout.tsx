import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollReveal } from "@/components/site/scroll-reveal";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
