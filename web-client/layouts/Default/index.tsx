import React, { ReactNode } from "react";
import styles from "./index.module.scss";

export default function Default(props: { children: ReactNode }): JSX.Element {
  return <div className={styles.defaultLayout}>{props.children}</div>;
}
