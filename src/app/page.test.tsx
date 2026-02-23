import Home from "./page";
import { contentProvider } from "@/lib/cms/provider";

jest.mock("@/lib/cms/provider", () => ({
  contentProvider: {
    getLatestPosts: jest.fn(),
  },
}));

describe("Home page", () => {
  it("passes latest posts to PostList with correct title", async () => {
    const mockPosts = [{ id: "1", title: "Post", slug: "post" }];
    (contentProvider.getLatestPosts as jest.Mock).mockResolvedValue(mockPosts);

    const element = await Home();

    expect(contentProvider.getLatestPosts).toHaveBeenCalledWith(10);
    expect(element.props.title).toBe("Latest posts");
    expect(element.props.posts).toEqual(mockPosts);
  });
});
