import { createContext } from "react";
import valueOnError from "@/lib/valueOnError";

export const ImgSrcSet = createContext("");
export const ImgSizes = createContext("");

export const multipleSizes = valueOnError(
  (...sizes: (string | undefined | null)[]) =>
    sizes.filter((value) => !!value).join(", "),
  () => "",
);

export const multipleSrcSet = multipleSizes;

export function srcSetFromObject(
  srcSet: Record<number | string, string | number>,
): string {
  return Object.keys(srcSet)
    .map(
      (width) =>
        `${
          typeof srcSet[width] === "string"
            ? srcSet[width]
            : `${srcSet[width]}px`
        } ${width}w`,
    )
    .join(", ");
}

export function sizesFromObject(
  sizes: Record<number | string | "defaultWidth", string | number>,
): string {
  return Object.keys(sizes)
    .map(
      (width) =>
        `${width === "defaultWidth" ? "" : `max-width: (${width}px) `}${
          typeof sizes[width] === "string" ? sizes[width] : `${sizes[width]}px`
        }`,
    )
    .join(", ");
}
