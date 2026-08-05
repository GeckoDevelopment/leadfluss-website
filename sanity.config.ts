import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Leadfluss Redaktion",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
