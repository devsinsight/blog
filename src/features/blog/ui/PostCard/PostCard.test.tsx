import { screen } from "@testing-library/react";
import PostCard from "./PostCard";
import { renderWithProviders } from "@/tests/renderWithProviders";
import type { PostView } from "@/lib/cms/sanity/types";

const basePost: PostView = {
  id: "1",
  slug: "sample-post",
  title: "Sample Post",
  excerpt: "This is a sample excerpt for testing.",
  publishedAt: "2024-01-01T00:00:00.000Z",
  tags: [{ name: "Testing", slug: "testing", id: "t1" }],
  author: { name: "Author Name", slug: "author-name", id: "a1" },
  createdAt: "2024-01-01T00:00:00.000Z",
};

describe("PostCard", () => {
  it("renders title, excerpt, and date", () => {
    renderWithProviders(<PostCard post={basePost} />);

    expect(screen.getByText(/sample post/i)).toBeInTheDocument();
    expect(screen.getByText(/sample excerpt/i)).toBeInTheDocument();
    expect(screen.getByText(/jan\s+1,\s+2024/i)).toBeInTheDocument();
  });
});

