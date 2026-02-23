import { buildShareLinks } from "./shareLinks";

describe("buildShareLinks", () => {
  it("builds X and LinkedIn share URLs", () => {
    const links = buildShareLinks("https://example.com/about");
    expect(links.x).toContain("https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com%2Fabout&text=");
    expect(links.linkedin).toBe(
      "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fexample.com%2Fabout"
    );
  });
});
