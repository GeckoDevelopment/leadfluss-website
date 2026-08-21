import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { CookieConsent } from "@/components/site/cookie-consent";
import { MetaCapi } from "@/components/site/meta-capi";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollReveal />
      <CookieConsent />
      <MetaCapi />
    </>
  );
}
