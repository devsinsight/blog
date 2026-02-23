declare module "react-syntax-highlighter" {
  import * as React from "react";

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: unknown;
    customStyle?: React.CSSProperties;
    showLineNumbers?: boolean;
    wrapLongLines?: boolean;
    codeTagProps?: React.HTMLAttributes<HTMLElement>;
    PreTag?: string | React.ComponentType;
    children?: React.ReactNode;
  }

  export class Prism extends React.Component<SyntaxHighlighterProps> {}
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism" {
  export const atomDark: unknown;
  export const duotoneDark: unknown;
  export const coy: unknown;
}

