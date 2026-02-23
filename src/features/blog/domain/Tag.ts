export type TagId = string;

export type Tag = {
  id: TagId;
  name: string;
  slug: string;
  description?: string;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
};

export type TagSummary = Pick<Tag, "id" | "name" | "slug">;
