export type AuthorId = string;

export type Author = {
  id: AuthorId;
  name: string;
  slug: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  social?: Partial<{
    twitter: string;
    github: string;
    linkedin: string;
    website: string;
  }>;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
};

export type AuthorSummary = Pick<Author, "id" | "name" | "slug" | "avatarUrl">;
