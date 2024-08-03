import { ReactNode, useContext, useId, useMemo, useState } from "react";
import { ImgSizes, multipleSizes } from "./SrcSet";
import UpdatableSSRScript from "@/components/UpdatableSSRScript/UpdatableSSRScript";
import maybeFunction from "@/lib/maybeFunction";

export default function ResponsiveImg(props: {
  children: ReactNode | ((width: number) => ReactNode);
}) {
  const parentSizes = useContext(ImgSizes);
  const id = useId();

  const isEmpty = !parentSizes;

  const defaultServerWidth = useMemo(() => {
    if (typeof window === "undefined") return 0;

    const script = document.querySelector(`[data-img-sizes="${id}"]`) as
      | HTMLElement
      | undefined;

    if (!script) return 0;

    return Number(script.getAttribute("data-width")) ?? 0;
  }, []);

  const [currentWidth, setCurrentWidth] = useState(defaultServerWidth);

  return (
    <>
      <ImgSizes.Provider
        value={multipleSizes(parentSizes, `${currentWidth}px`)}
      >
        {maybeFunction(props.children)(currentWidth)}
      </ImgSizes.Provider>
      {isEmpty && (
        <UpdatableSSRScript
          data-img-sizes={id}
          data-width={defaultServerWidth}
          rerunOnMount
          callback={(context) => {
            const script = context.element as HTMLElement;
            const image = script.previousSibling as HTMLElement;
            const parent = script.parentElement as HTMLElement;

            function debounce(origin: () => void, delay: number) {
              let timeoutID: NodeJS.Timeout | undefined;

              return () => {
                clearTimeout(timeoutID);

                timeoutID = setTimeout(origin, delay);
              };
            }

            function handle() {
              const width = image.clientWidth || parent.clientWidth;

              if (!width) return;

              if (context.place === "react") {
                setCurrentWidth(width);
              } else {
                script.setAttribute("data-width", `${width}`);
                image.setAttribute("sizes", `${width}px`);
              }
            }

            handle();

            const observer = new ResizeObserver(debounce(handle, 100));

            observer.observe(parent);

            return () => observer.disconnect();
          }}
        ></UpdatableSSRScript>
      )}
    </>
  );
}
