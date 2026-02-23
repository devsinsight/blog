import type { PostView } from "@/lib/cms/sanity/types";

export interface ContentProvider {
  getLatestPosts(limit?: number): Promise<PostView[]>;
  getAllPosts(limit?: number): Promise<PostView[]>;
  getPostBySlug(slug: string): Promise<PostView | null>;
}
