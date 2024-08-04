import { ReactNode } from "react";
import styles from "./InlineLink.module.scss";
import clsx from "clsx";

export default function InlineLink(props: {
  children: ReactNode;
  noUnderline?: boolean;
}) {
  return (
    <span
      className={clsx(
        styles.inlineLink,
        props.noUnderline && styles.inlineLink_noUnderline,
      )}
    >
      {props.children}
    </span>
  );
}
