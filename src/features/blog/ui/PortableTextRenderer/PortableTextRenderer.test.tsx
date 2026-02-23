import React, { ReactNode } from "react";
import { render, screen } from "@/tests/renderWithProviders";
import { PortableTextRenderer } from "./PortableTextRenderer";

jest.mock("@/lib/cms/sanity/image", () => ({
  buildSanityImageUrl: () => "https://example.com/image.jpg",
}));

jest.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: ReactNode }) => <pre>{children}</pre>,
}));

jest.mock(
  "react-syntax-highlighter/dist/cjs/styles/prism",
  () => ({ atomDark: {} }),
  { virtual: true },
);

jest.mock("@portabletext/react", () => ({
  PortableText: ({
    value,
    components,
  }: {
    value: unknown[];
    components: { types?: Record<string, (args: { value: unknown }) => ReactNode> };
  }) => (
    <div>
      {value.map((item, idx) => {
        if ((item as { _type?: string })._type === "code") {
          const Code = components.types?.code;
          return Code ? <div key={idx}>{Code({ value: item })}</div> : null;
        }
        return <div key={idx}>block</div>;
      })}
    </div>
  ),
}));

describe("PortableTextRenderer", () => {
  it("renders a code block", () => {
    const value = [
      {
        _key: "a",
        _type: "code",
        code: "console.log('hello')",
        language: "javascript",
        filename: "hello.js",
      },
    ];

    render(<PortableTextRenderer value={value} />);

    expect(screen.getByText("hello.js")).toBeInTheDocument();
    expect(screen.getByText("console.log('hello')")).toBeInTheDocument();
  });
});

