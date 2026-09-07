import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { CookieConsent } from "@/components/site/cookie-consent";
import { MetaCapi } from "@/components/site/meta-capi";
import { JsonLd } from "@/components/site/json-ld";
import { organizationSchema } from "@/lib/structured-data";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollReveal />
      <CookieConsent />
      <MetaCapi />
    </>
  );
}
