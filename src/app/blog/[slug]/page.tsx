import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableTextRenderer } from "@/features/blog/ui/PortableTextRenderer/PortableTextRenderer";
import { buildSanityImageUrl } from "@/lib/cms/sanity/image";
import { contentProvider } from "@/lib/cms/provider";
import type { PostView } from "@/lib/cms/sanity/types";

type BlogPostPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await Promise.resolve(params);
  const post: PostView | null = await contentProvider.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverUrl = buildSanityImageUrl(post.coverImage, { width: 1200, height: 630, quality: 80 });

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        {post.publishedAt && <p>{new Date(post.publishedAt).toDateString()}</p>}
        {post.excerpt && <p>{post.excerpt}</p>}
        {coverUrl && (
          <div style={{ position: "relative", width: "100%", maxWidth: 1200, aspectRatio: "1200 / 630" }}>
            <Image
              src={coverUrl}
              alt={post.coverImageAlt ?? post.title}
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              priority
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          </div>
        )}
      </header>
      <section>
        <PortableTextRenderer value={post.body} />
      </section>
    </article>
  );
}

