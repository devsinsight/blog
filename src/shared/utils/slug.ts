const DEFAULT_SEPARATOR = "-";

const INVALID_CHARS_REGEX = /[^a-z0-9]+/g;
const MULTI_SEPARATOR_REGEX = /-{2,}/g;

export type SlugOptions = {
  separator?: string;
};

export function slugify(input: string, options: SlugOptions = {}): string {
  const separator = options.separator ?? DEFAULT_SEPARATOR;

  if (!input) return "";

  const normalized = input
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "");

  const withSeparators = normalized.replace(INVALID_CHARS_REGEX, separator);
  const collapsed = withSeparators.replace(MULTI_SEPARATOR_REGEX, separator);
  const trimmed = collapsed.replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");

  return trimmed;
}

export function isSlugEqual(a: string, b: string): boolean {
  return slugify(a) === slugify(b);
}
