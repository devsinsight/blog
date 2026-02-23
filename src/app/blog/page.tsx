import PostList from "@/features/blog/ui/PostList/PostList";
import { contentProvider } from "@/lib/cms/provider";
import type { PostView } from "@/lib/cms/sanity/types";

export default async function BlogPage() {
  const posts: PostView[] = await contentProvider.getAllPosts(50);
  return <PostList posts={posts} title="All posts" />;
}
