"use client";

import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { PostView } from "@/lib/cms/sanity/types";

export type PostCardProps = {
  post: PostView;
};

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(post.publishedAt))
    : "Unpublished";

  return (
    <Card variant="outlined">
      <CardActionArea component={Link} href={`/blog/${post.slug}`}>
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
              <Chip size="small" label={post.author?.name ?? "Unknown"} aria-label="Author" />
            </Stack>

            <Typography variant="h6" component="h3">
              {post.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {post.excerpt ?? ""}
            </Typography>

            {post.tags && post.tags.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {post.tags.map((tag) => (
                  <Chip key={tag.slug ?? tag.name} size="small" label={`#${tag.name}`} />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

