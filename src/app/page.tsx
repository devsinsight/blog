import PostList from "@/features/blog/ui/PostList/PostList";
import { contentProvider } from "@/lib/cms/provider";

export default async function Home() {
  const latestPosts = await contentProvider.getLatestPosts(10);

  return <PostList posts={latestPosts} title="Latest posts" />;
}
