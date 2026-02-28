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
    h1: ({ children }) => <h1 className="prose-heading h1">{children}</h1>,
    h2: ({ children }) => <h2 className="prose-heading h2">{children}</h2>,
    h3: ({ children }) => <h3 className="prose-heading h3">{children}</h3>,
    h4: ({ children }) => <h4 className="prose-heading h4">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="prose-quote">{children}</blockquote>,
    normal: ({ children }) => <p className="prose-paragraph">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="prose-strong">{children}</strong>,
    em: ({ children }) => <em className="prose-em">{children}</em>,
    underline: ({ children }) => <span className="prose-underline">{children}</span>,
    code: ({ children }) => <code className="prose-inline-code">{children}</code>,
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href ?? "#"}
        target={(value as { openInNewTab?: boolean })?.openInNewTab ? "_blank" : "_self"}
        rel="noreferrer"
        className="prose-link"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="prose-list prose-list-bullet">{children}</ul>,
    number: ({ children }) => <ol className="prose-list prose-list-number">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="prose-list-item">{children}</li>,
    number: ({ children }) => <li className="prose-list-item">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const url = buildSanityImageUrl(value, { width: 1600, quality: 80 });

      if (!url) return null;

      const alt = (value as { alt?: string; caption?: string })?.alt ?? (value as { caption?: string })?.caption ?? "";

      return (
        <figure className="prose-figure">
          <div className="prose-image-wrapper">
            <Image
              src={url}
              alt={alt}
              fill
              sizes="(min-width: 1600px) 1600px, 100vw"
              style={{ objectFit: "contain" }}
              loading="lazy"
              priority={false}
            />
          </div>
          {alt ? <figcaption className="prose-figcaption">{alt}</figcaption> : null}
        </figure>
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

