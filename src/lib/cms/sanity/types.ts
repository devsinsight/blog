import type { AuthorProfile, BlockContent, Post, Slug } from "@/sanity/types/sanity.generated";

export type PostQueryResult =
  | (Post & {
      mainImage?: (Post["image"] & { caption?: string }) | null;
      coverImageUrl?: string | null;
      excerpt?: string | null;
      status?: string | null;
      author?: {
        _id?: string;
        name?: string;
        slug?: Slug | string | null;
        avatarUrl?: string | null;
      } | null;
      tags?: Array<{ _id?: string; name?: string; slug?: Slug | string | null } | null> | null;
    })
  | null;

export type PostView = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  coverImage?: Post["image"] | null;
  body?: BlockContent;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
  author?: {
    id?: string;
    name?: string;
    slug?: string;
    avatarUrl?: string;
  };
  tags: Array<{ id?: string; name?: string; slug?: string }>;
};

export type AuthorProfileView = AuthorProfile;
