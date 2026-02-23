import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

const isConfigured = (projectId?: string, dataset?: string) =>
  Boolean(projectId && dataset && projectId !== "dummyProjectId" && dataset !== "dummyDataset");

const normalizeSource = (source: unknown): SanityImageSource | null => {
  if (!source || typeof source !== "object") return null;

  const candidate = source as {
    _ref?: string;
    asset?: { _ref?: string; url?: string };
  };

  // If it's already a ref
  if (candidate._ref) return candidate as SanityImageSource;

  // If it's an image object with asset ref
  if (candidate.asset?._ref) return candidate as SanityImageSource;

  // If we have direct URL, we can return a minimal source
  if (candidate.asset?.url) return { asset: { url: candidate.asset.url } } as SanityImageSource;

  return null;
};


const getBuilder = () => {
  const { projectId, dataset } = sanityClient.config();
  if (!isConfigured(projectId, dataset)) return null;

  return imageUrlBuilder({ projectId: projectId as string, dataset: dataset as string });
};

export function urlFor(source: unknown) {
  const normalized = normalizeSource(source);
  if (!normalized) return null;
  const builder = getBuilder();
  if (!builder) return null;
  return builder.image(normalized);
}

type BuildOptions = {
  width?: number;
  height?: number;
  quality?: number;
};

export function buildSanityImageUrl(
  source: unknown,
  { width, height, quality }: BuildOptions = {}
): string | null {
  if (!source || typeof source !== "object") return null;

  const directUrl = (source as { asset?: { url?: string } })?.asset?.url;
  if (typeof directUrl === "string" && directUrl.startsWith("http")) {
    return directUrl;
  }

  const imageBuilder = urlFor(source);
  if (!imageBuilder) return null;

  let pipeline = imageBuilder;
  if (width) pipeline = pipeline.width(width);
  if (height) pipeline = pipeline.height(height);
  if (quality) pipeline = pipeline.quality(quality);

  return pipeline.auto("format").url();
}

