import { SanityContentProvider } from "./sanity/SanityContentProvider";
import type { ContentProvider } from "@/features/blog/services/ContentProvider";

const isTestEnv = process.env.NODE_ENV === "test";
const isBuildStub = process.env.SANITY_STUB === "true";

const stubProvider: ContentProvider = {
  async getLatestPosts() {
    return [];
  },
  async getAllPosts() {
    return [];
  },
  async getPostBySlug() {
    return null;
  },
};

export const contentProvider: ContentProvider = isTestEnv || isBuildStub
  ? stubProvider
  : new SanityContentProvider();

