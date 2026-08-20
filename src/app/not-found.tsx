import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { NotFoundContent } from "@/components/site/not-found-content";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description: "Diese Seite existiert nicht oder wurde verschoben.",
};

// Greift bei nicht zugeordneten URLs außerhalb des (site)-Layouts – deshalb
// werden Navbar und Footer hier selbst gerendert.
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
