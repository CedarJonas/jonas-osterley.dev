import { getCollection, type CollectionEntry } from "astro:content";

type ProjectEntry = CollectionEntry<"projects">;

// Landing pages are index.md (slug is the bare folder name); write-ups are
// sibling files (slug is "project/write-up"). The slug shape is what
// distinguishes the two frontmatter variants in the union schema.
export type LandingEntry = ProjectEntry & {
  data: Extract<ProjectEntry["data"], { order: number }>;
};
export type WriteUpEntry = ProjectEntry & {
  data: Extract<ProjectEntry["data"], { date: Date }>;
};

const isLanding = (entry: ProjectEntry): entry is LandingEntry => !entry.slug.includes("/");
const isWriteUp = (entry: ProjectEntry): entry is WriteUpEntry => entry.slug.includes("/");

export async function getLandingPages(): Promise<LandingEntry[]> {
  const entries = await getCollection("projects");
  return entries.filter(isLanding).sort((a, b) => a.data.order - b.data.order);
}

export async function getWriteUps(projectSlug?: string): Promise<WriteUpEntry[]> {
  const entries = await getCollection("projects");
  return entries
    .filter(isWriteUp)
    .filter((entry) => !entry.data.draft)
    .filter((entry) => (projectSlug ? entry.slug.startsWith(`${projectSlug}/`) : true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getEssays() {
  const entries = await getCollection("writing");
  return entries
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
