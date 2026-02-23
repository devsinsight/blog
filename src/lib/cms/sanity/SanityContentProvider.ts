import type { ContentProvider } from "@/features/blog/services/ContentProvider";
import { mapSanityPostDetail, mapSanityPostListItem } from "./mappers";
import { sanityClient } from "./client";
import { latestPostsQuery, postBySlugQuery } from "./queries";
import type { PostView } from "./types";

const DEFAULT_LIMIT = 20;
const fetchOptions = { next: { revalidate: 30 } } as const;

export class SanityContentProvider implements ContentProvider {
  async getLatestPosts(limit = DEFAULT_LIMIT): Promise<PostView[]> {
    const safeLimit = limit > 0 ? limit : DEFAULT_LIMIT;
    const result = await sanityClient.fetch(latestPostsQuery, { limit: safeLimit }, fetchOptions);
    return (result ?? []).map(mapSanityPostListItem).filter(Boolean) as PostView[];
  }

  async getAllPosts(limit = DEFAULT_LIMIT): Promise<PostView[]> {
    const safeLimit = limit > 0 ? limit : DEFAULT_LIMIT;
    const result = await sanityClient.fetch(latestPostsQuery, { limit: safeLimit }, fetchOptions);
    return (result ?? []).map(mapSanityPostListItem).filter(Boolean) as PostView[];
  }

  async getPostBySlug(slug: string): Promise<PostView | null> {
    if (!slug) return null;
    const result = await sanityClient.fetch(postBySlugQuery, { slug }, fetchOptions);
    console.log('RESULT: ', result)
    return mapSanityPostDetail(result);
  }
}
