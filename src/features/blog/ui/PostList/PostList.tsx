"use client";

import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import type { PostView } from "@/lib/cms/sanity/types";
import PostCard from "@/features/blog/ui/PostCard/PostCard";

export type PostListProps = {
  posts: PostView[];
  title?: string;
};

export default function PostList({ posts, title = "Latest posts" }: PostListProps) {
  return (
    <section aria-label="Post list">
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>

      <Grid container spacing={2} columns={12}>
        {posts.map((post) => (
          <Grid key={post.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

