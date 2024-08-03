import clsx from "clsx";
import styles from "./Img.module.scss";
import { CSSProperties, useContext } from "react";
import rem from "@/lib/rem";
import { ImgSizes, ImgSrcSet, multipleSizes, multipleSrcSet } from "./SrcSet";

export default function Img(props: {
  src: string;
  width: string | number;
  height: string | number;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  className?: string;
  adaptiveWidth?: boolean;
  isPriority?: boolean;
}) {
  const sizes = useContext(ImgSizes);
  const srcSet = useContext(ImgSrcSet);

  return (
    <img
      src={props.src}
      srcSet={multipleSrcSet(srcSet, props.srcSet) || undefined}
      sizes={multipleSizes(sizes, props.sizes) || undefined}
      width={props.width}
      height={props.height}
      loading={props.isPriority ? "eager" : "lazy"}
      decoding={props.isPriority ? "sync" : "async"}
      className={clsx(props.adaptiveWidth && styles.adaptive, props.className)}
      alt={props.alt || ""}
      style={
        props.adaptiveWidth
          ? ({
              "--width": rem(props.width),
              "--height": rem(props.height),
            } as CSSProperties)
          : undefined
      }
      {...({
        fetchpriority: props.isPriority ? "high" : undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)}
      suppressHydrationWarning
    />
  );
}
