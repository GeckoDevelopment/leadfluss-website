import { CookieConsent } from "@/components/site/cookie-consent";
import { MetaCapi } from "@/components/site/meta-capi";

// Reduziertes Layout ohne Navbar/Footer – für fokussierte Funnel-Seiten wie
// /anfrage. Cookie-Consent und Meta-CAPI bleiben für Tracking/Compliance aktiv.
export default function BareLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <CookieConsent />
      <MetaCapi />
    </>
  );
}
