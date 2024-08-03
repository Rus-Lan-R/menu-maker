import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { isProduction } from "./isProduction";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: isProduction,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_TOKEN,
  perspective: "published",
});

export const builder = imageUrlBuilder(sanity);

export const sanityImage = builder.image.bind(builder);

export default sanity;
