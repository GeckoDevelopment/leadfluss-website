import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { teamMember } from "./teamMember";
import { caseStudy } from "./caseStudy";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, teamMember, caseStudy],
};
