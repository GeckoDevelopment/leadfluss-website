import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

export type CompanyLogo = {
  _id: string;
  name: string;
  logoUrl: string;
  website?: string;
};

// Alle Firmen mit hinterlegtem Übersichts-Logo (logoOverview) für die
// Logo-Wand auf der Startseite.
export const COMPANY_LOGOS_QUERY = groq`
  *[_type == "company" && defined(logoOverview.asset)] | order(name asc) {
    _id,
    name,
    "logoUrl": logoOverview.asset->url,
    website
  }
`;

export async function getCompanyLogos(): Promise<CompanyLogo[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(COMPANY_LOGOS_QUERY);
}
