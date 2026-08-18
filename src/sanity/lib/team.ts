import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
  linkedinUrl?: string;
};

export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    name,
    role,
    "imageUrl": image.asset->url,
    linkedinUrl
  }
`;

/** Demo-Team (bis das Leadfluss-Sanity verbunden ist). */
const DEMO_TEAM: TeamMember[] = [
  { _id: "demo-1", name: "Armin Hirschfeld", role: "Strategieberater" },
  { _id: "demo-2", name: "Peer Joeressen", role: "Kundenbetreuer" },
  { _id: "demo-3", name: "Jonas Gernhardt", role: "Videoproduzent" },
  { _id: "demo-4", name: "Anna Kischkat", role: "Marketing Expertin" },
  { _id: "demo-5", name: "Daniel Kreutzer", role: "Expansion Advisor" },
];

export async function getTeam(): Promise<TeamMember[]> {
  if (!isSanityConfigured) return DEMO_TEAM;
  return client.fetch(TEAM_QUERY);
}
