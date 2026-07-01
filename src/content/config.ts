import { defineCollection, z } from "astro:content";

// Landing pages (index.md) and write-ups (other .md files in the same
// project folder) live in one collection but carry different frontmatter.
const projectLanding = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(), // Manual ordering on home page
  status: z.enum(["active", "complete", "archived"]),
  tags: z.array(z.string()).default([]),
  repo: z.string().url().optional(),
});

const projectWriteUp = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  draft: z.boolean().default(false), // Drafts are excluded from builds — supports the staggered-release backlog (ADR-004)
});

const projects = defineCollection({
  type: "content",
  schema: z.union([projectLanding, projectWriteUp]),
});

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const experiments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    image: z.string().optional(), // Path to screenshot
  }),
});

export const collections = { projects, writing, experiments };
