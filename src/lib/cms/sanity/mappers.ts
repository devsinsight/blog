import type { BlockContent, Post, Slug } from "@/sanity/types/sanity.generated";
import type { PostView } from "./types";

type SanityTag = { _id?: string | null; name?: string | null; slug?: Slug | string | null } | null | undefined;
type SanityAuthor = { _id?: string | null; name?: string | null; slug?: Slug | string | null; avatarUrl?: string | null } | null | undefined;
type SanityPost =
  | (Post & {
      mainImage?: (Post["image"] & { caption?: string }) | null;
      coverImageUrl?: string | null;
      excerpt?: string | null;
      status?: string | null;
      author?: SanityAuthor;
      tags?: Array<SanityTag> | null;
      body?: BlockContent;
      content?: BlockContent;
    })
  | null;

const normalizeSlug = (slug?: Slug | string | null | undefined) => {
  if (!slug) return null;
  if (typeof slug === "string") return slug;
  return slug.current ?? null;
};

const mapTag = (tag: SanityTag) => {
  const name = tag?.name;
  if (!name) return null;
  const slugString = normalizeSlug(tag?.slug) ?? name;
  return {
    id: tag?._id ?? slugString,
    name,
    slug: slugString,
  } satisfies PostView["tags"][number];
};

const mapAuthor = (author: SanityAuthor) => {
  const name = author?.name;
  if (!name) return null;
  const slugString = normalizeSlug(author?.slug) ?? name;
  return {
    id: author?._id ?? slugString,
    name,
    slug: slugString,
    avatarUrl: author?.avatarUrl ?? undefined,
  } satisfies NonNullable<PostView["author"]>;
};

const basePost = (post: SanityPost) => {
  const slug = normalizeSlug(post?.slug);
  if (!post?._id || !slug || !post?.title) return null;

  const tags = (post?.tags ?? []).map(mapTag).filter(Boolean) as PostView["tags"];
  const author = mapAuthor(post?.author);
  const coverImage = post?.image ?? post?.mainImage ?? null;
  const coverImageAlt =
    (post?.mainImage as { alt?: string | null; caption?: string | null } | null)?.alt ??
    (post?.mainImage as { alt?: string | null; caption?: string | null } | null)?.caption ??
    post?.title ?? undefined;

  return {
    id: post._id,
    slug,
    title: post.title ?? "",
    excerpt: post.excerpt ?? undefined,
    coverImageUrl: post.coverImageUrl ?? undefined,
    coverImage,
    coverImageAlt,
    author: author ?? { id: "unknown", name: "Unknown", slug: "unknown", avatarUrl: undefined },
    tags,
    publishedAt: post.publishedAt ?? undefined,
    createdAt: post._createdAt ?? new Date().toISOString(),
    updatedAt: post._updatedAt ?? undefined,
  } satisfies Partial<PostView> & { id: string; slug: string; title: string };
};

export function mapSanityPostListItem(post: SanityPost): PostView | null {
  const base = basePost(post);
  if (!base) return null;
  return {
    ...base,
    body: undefined,
  } satisfies PostView;
}

export function mapSanityPostDetail(post: SanityPost): PostView | null {
  const base = basePost(post);
  if (!base) return null;
  return {
    ...base,
    body: post?.body ?? post?.content ?? [],
  } satisfies PostView;
}
