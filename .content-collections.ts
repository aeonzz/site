import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { getMdxTableOfContents } from "@/lib/mdx-toc";
import { z } from "zod";

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    href: z.string().url(),
    type: z.string(),
    summary: z.string(),
    image: z.string(),
    order: z.number(),
    content: z.string(),
  }),
  transform: async (project, context) => {
    const body = await compileMDX(context, project);
    const toc = getMdxTableOfContents(project.content);

    return {
      ...project,
      body,
      toc,
    };
  },
});

export default defineConfig({
  content: [projects],
});
