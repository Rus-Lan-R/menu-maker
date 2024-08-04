import { DependencyList, MutableRefObject, useEffect } from "react";

export default function useOuterClick(
  target: MutableRefObject<HTMLElement | null | undefined>,
  callback: () => void,
  deps: DependencyList = [],
  isDisabled?: boolean,
) {
  useEffect(() => {
    if (!target.current || isDisabled) return undefined;

    const checkIsCurrent = (element: HTMLElement): boolean => {
      if (element === target.current) return true;
      if (element === document.body) return false;
      if (element.parentElement === null) return false;

      return checkIsCurrent(element.parentElement);
    };

    const handle = (event: MouseEvent) => {
      const clicked = event.target as HTMLElement;

      if (!checkIsCurrent(clicked)) {
        callback();
      }
    };

    window.addEventListener("click", handle);

    return () => window.removeEventListener("click", handle);
  }, [isDisabled, ...deps]);
}
