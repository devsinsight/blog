import { CodeBlock } from "@/features/blog/ui/CodeBlock/CodeBlock";
import { PortableTextRenderer } from "@/features/blog/ui/PortableTextRenderer/PortableTextRenderer";
import { renderWithProviders, screen, waitFor } from "@/tests/renderWithProviders";
import userEvent from "@testing-library/user-event";

jest.mock("react-syntax-highlighter", () => ({
  __esModule: true,
  Prism: ({ children }: { children: React.ReactNode }) => <pre>{children}</pre>,
}));

type PortableValue = { _type: string; code?: string; language?: string; filename?: string } | undefined;

type CodeRenderer = ({ value }: { value: PortableValue }) => React.ReactNode;

type PortableComponents = {
  types?: {
    code?: CodeRenderer;
  };
};

jest.mock("@portabletext/react", () => ({
  __esModule: true,
  PortableText: ({ value, components }: { value: PortableValue[]; components: PortableComponents }) => {
    const first = Array.isArray(value) ? value[0] : value;
    const codeRenderer = components?.types?.code;
    if (first && codeRenderer) {
      return codeRenderer({ value: first });
    }
    return null;
  },
}));

jest.mock("@/lib/cms/sanity/image", () => ({
  buildSanityImageUrl: () => null,
}));

describe("CodeBlock", () => {
  const codeSample = "const answer = 42;";
  let writeTextMock: jest.Mock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true,
    });
  });

  it("renders language label and code content", () => {
    renderWithProviders(<CodeBlock code={codeSample} language="ts" filename="example.ts" />);

    expect(screen.getByText("ts")).toBeInTheDocument();
    expect(screen.getByText("example.ts")).toBeInTheDocument();
    expect(screen.getByText(codeSample)).toBeInTheDocument();
  });

  it("copies code to clipboard and shows feedback", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CodeBlock code={codeSample} language="ts" />);

    const copyButton = screen.getByRole("button", { name: /copy code/i });

    await user.click(copyButton);

    expect(await screen.findByRole("button", { name: /copied/i })).toBeInTheDocument();
  });
});

describe("PortableTextRenderer", () => {
  it("renders CodeBlock for code type", () => {
    const value = [
      {
        _type: "code",
        code: "console.log('hello');",
        language: "js",
        filename: "hello.js",
      },
    ];

    renderWithProviders(<PortableTextRenderer value={value} />);

    expect(screen.getByText("js")).toBeInTheDocument();
    expect(screen.getByText("hello.js")).toBeInTheDocument();
    expect(screen.getByText("console.log('hello');")).toBeInTheDocument();
  });
});

