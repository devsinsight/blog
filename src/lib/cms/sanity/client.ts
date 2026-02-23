import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? "dummyProjectId";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "dummyDataset";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? process.env.SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_READ_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: !token,
});
