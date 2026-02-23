import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { buildSanityImageUrl } from "@/lib/cms/sanity/image";
import { CodeBlock } from "@/features/blog/ui/CodeBlock/CodeBlock";

type PortableTextValue = PortableTextBlock | PortableTextBlock[] | ({ _type: string; [key: string]: unknown } | PortableTextBlock)[];

type PortableTextRendererProps = {
  value?: PortableTextValue | null;
};

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={(value as { href?: string })?.href ?? "#"} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = buildSanityImageUrl(value, { width: 1200, quality: 80 });

      if (!url) return null;

      const alt = (value as { alt?: string; caption?: string })?.alt ?? (value as { caption?: string })?.caption ?? "";

      return (
        <div style={{ position: "relative", width: "100%", maxWidth: 1200, aspectRatio: "1200 / 800", margin: "16px 0" }}>
          <Image
            src={url}
            alt={alt}
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </div>
      );
    },
    code: ({ value }) => (
      <CodeBlock
        code={(value as { code?: string })?.code ?? ""}
        language={(value as { language?: string })?.language}
        filename={(value as { filename?: string })?.filename}
      />
    ),
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null;

  const normalizedValue = Array.isArray(value) ? value : [value];

  return <PortableText value={normalizedValue as PortableTextBlock[]} components={components} />;
}

