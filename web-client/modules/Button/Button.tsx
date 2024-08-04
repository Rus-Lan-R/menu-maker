import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import palette from "./palette.module.scss";
import styles from "./Button.module.scss";
import clsx from "clsx";
import Link from "next/link";
import useOuterClick from "@/hooks/useOuterClick";
import { createDataAttribute } from "@sanity/visual-editing";

export { palette };

type NativeProps = ButtonHTMLAttributes<HTMLButtonElement> &
  HTMLAttributes<HTMLAnchorElement>;

export default function Button({
  children,
  palette: buttonPallete,
  href,
  ...element
}: {
  children: ReactNode;
  palette: string;
  href?: string;
  animation?: ReactNode;
} & NativeProps) {
  const button = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const [isClicked, setIsClicked] = useState(false);

  useOuterClick(button, () => setIsClicked(false));

  const Element = href ? Link : "button";

  const className = clsx(
    element.className,
    buttonPallete,
    styles.button,
    isClicked && styles.button_clicked,
    element.disabled && palette.disabled,
  );

  // const attr = createDataAttribute({
  //   id: documentId,
  //   type: documentType,
  //   path: fieldPath,
  // });

  return (
    <Element
      ref={button}
      href={href as string}
      type={element.type || "button"}
      {...element}
      className={className}
      onClick={(event) => {
        setIsClicked(true);

        element.onClick?.(
          event as Parameters<NonNullable<NativeProps["onClick"]>>["0"],
        );
      }}
    >
      <div className={styles.button__content}>{children}</div>
    </Element>
  );
}
