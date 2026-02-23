import { mapSanityPostDetail, mapSanityPostListItem } from "./mappers";
import type { Post } from "@/sanity/types/sanity.generated";

const baseDoc: Post = {
  _id: "post-1",
  _type: "post",
  _rev: "rev-1",
  _createdAt: "2024-01-01T00:00:00.000Z",
  _updatedAt: "2024-01-02T00:00:00.000Z",
  title: "Hello World",
  slug: { _type: "slug", current: "hello-world" },
  body: [],
  image: { _type: "image", asset: { _ref: "image-1", _type: "reference" }, alt: "Alt text" },
  publishedAt: "2024-01-01T00:00:00.000Z",
};

describe("sanity mappers", () => {
  it("maps list items with slug string", () => {
    const result = mapSanityPostListItem(baseDoc);

    expect(result).not.toBeNull();
    expect(result?.slug).toBe("hello-world");
    expect(result?.body).toBeUndefined();
  });

  it("maps detail including body", () => {
    const docWithBody: Post = { ...baseDoc, body: [{ _type: "block", children: [] }] };

    const result = mapSanityPostDetail(docWithBody);

    expect(result?.slug).toBe("hello-world");
    expect(result?.body).toEqual(docWithBody.body);
  });
});

