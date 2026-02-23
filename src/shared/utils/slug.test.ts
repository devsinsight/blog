import { isSlugEqual, slugify } from "./slug";

describe("slug utility", () => {
  it("normalizes text with spaces and punctuation", () => {
    expect(slugify("Hello, World!"))
      .toBe("hello-world");
  });

  it("removes diacritics and collapses separators", () => {
    expect(slugify("Crème brûlée -- deluxe"))
      .toBe("creme-brulee-deluxe");
  });

  it("respects custom separator", () => {
    expect(slugify("Hello World", { separator: "_" }))
      .toBe("hello_world");
  });

  it("treats strings as equal when slugified", () => {
    expect(isSlugEqual("Hello World", "hello-world")).toBe(true);
  });
});
