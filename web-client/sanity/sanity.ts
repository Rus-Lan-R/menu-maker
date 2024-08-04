import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityClient } from "next-sanity";

export const SANITY_API_READ_TOKEN = process.env.SANITY_API_READ_TOKEN;
export const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export function getSanityClient(previewToken?: string): SanityClient {
  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    token: previewToken,
    useCdn: !SANITY_API_READ_TOKEN,
    perspective: SANITY_API_READ_TOKEN ? "previewDrafts" : "published",
    stega: {
      enabled: SANITY_API_READ_TOKEN ? true : false,
      studioUrl: "/",
    },
  });
}

export const builder = imageUrlBuilder(getSanityClient());

export const sanityImage = builder.image.bind(builder);

export default getSanityClient();
