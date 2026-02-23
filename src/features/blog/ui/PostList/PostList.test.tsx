import { screen } from "@testing-library/react";
import PostList from "./PostList";
import { renderWithProviders } from "@/tests/renderWithProviders";
import type { PostView } from "@/lib/cms/sanity/types";

const posts: PostView[] = [
  {
    id: "1",
    slug: "first",
    title: "First",
    excerpt: "One",
    publishedAt: "2024-01-01T00:00:00.000Z",
    tags: [],
    author: { id: "a1", name: "Author", slug: "author", avatarUrl: undefined },
    createdAt: "2024-01-01T00:00:00.000Z",
    body: [],
  },
  {
    id: "2",
    slug: "second",
    title: "Second",
    excerpt: "Two",
    publishedAt: "2024-01-02T00:00:00.000Z",
    tags: [],
    author: { id: "a1", name: "Author", slug: "author", avatarUrl: undefined },
    createdAt: "2024-01-02T00:00:00.000Z",
    body: [],
  },
];

describe("PostList", () => {
  it("renders multiple post cards", () => {
    renderWithProviders(<PostList posts={posts} title="All posts" />);

    posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });
});

