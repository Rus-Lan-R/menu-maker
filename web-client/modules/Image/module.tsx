import { FreeModule, imageStruct } from "@/lib/module/freeModule";
import {
  object,
  mask,
  array,
  number,
  optional,
  boolean,
  string,
} from "superstruct";
import { nonNullable } from "@/lib/nonNullable";
import Img from "@/components/Img/Img";
import {
  multipleSizes,
  multipleSrcSet,
  sizesFromObject,
  srcSetFromObject,
} from "@/components/Img/SrcSet";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { toNumber } from "@/lib/toNumber";
import { sanityImage } from "@/sanity/sanity";

export const schema = object({
  image: imageStruct,
  alt: optional(string()),
  priority: optional(boolean()),
  sizes: optional(
    array(
      object({
        minScreenWidth: number(),
        imageWidth: number(),
        isPercentage: optional(boolean()),
      }),
    ),
  ),
});

export function optiImage(image: ImageUrlBuilder, width: number | string) {
  return image.width(toNumber(width)).auto("format").quality(70).url();
}

const defaultSizes = {
  defaultWidth: "100vw",
};

const defaultSrcSet = (image: ImageUrlBuilder) => ({
  100: optiImage(image, 100),
  200: optiImage(image, 200),
  300: optiImage(image, 300),
  400: optiImage(image, 400),
  600: optiImage(image, 600),
  700: optiImage(image, 700),
  900: optiImage(image, 900),
  1200: optiImage(image, 1200),
  1500: optiImage(image, 1500),
  1800: optiImage(image, 1800),
  1940: optiImage(image, 1940),
  2100: optiImage(image, 2100),
  2400: optiImage(image, 2400),
  2600: optiImage(image, 2600),
  3200: optiImage(image, 3200),
  4000: optiImage(image, 4000),
});

export function imageDimensions(url: string): {
  width: string;
  height: string;
} {
  const dimensions = nonNullable(
    url.match(/\d+x\d+/)?.[0].split("x"),
    `Wrong image url ${url}`,
  );

  return {
    width: nonNullable(dimensions[0], `There is no width in url ${url}`),
    height: nonNullable(dimensions[1], `There is no height in url ${url}`),
  };
}

export const imageModule: FreeModule = {
  name: "module.image",
  module: (params) => {
    const validated = mask(params, schema);

    const image = sanityImage(validated.image.asset);
    const url = image.url();
    const { width, height } = imageDimensions(url);

    const srcSet = multipleSrcSet(
      ...(validated.sizes?.map((size) =>
        size.isPercentage
          ? undefined
          : `${optiImage(image, size.imageWidth)} ${
              size.imageWidth
            }w, ${optiImage(image, size.imageWidth * 2)} ${
              size.imageWidth * 2
            }w, ${optiImage(image, size.imageWidth * 3)} ${
              size.imageWidth * 3
            }w`,
      ) ?? []),
      srcSetFromObject({
        ...defaultSrcSet(image),
        [width]: url,
      }),
    );

    const sizes = multipleSizes(
      ...(validated.sizes?.map(
        (size) =>
          `(min-width: ${size.minScreenWidth}px) ${size.imageWidth}${
            size.isPercentage ? "vw" : "px"
          }`,
      ) ?? []),
      sizesFromObject(defaultSizes),
    );

    return {
      key: params._key,
      Render() {
        return (
          <Img
            isPriority={validated.priority}
            src={url}
            srcSet={srcSet}
            sizes={sizes}
            width={width}
            height={height}
            alt={validated.alt}
          ></Img>
        );
      },
    };
  },
};
