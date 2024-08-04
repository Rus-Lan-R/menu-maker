import { CSSProperties, ReactNode } from "react";
import types from "./types.module.scss";
import weight from "./weight.module.scss";
import fonts from "./fonts.module.scss";
import transform from "./transform.module.scss";
import clsx from "clsx";

export default function Text(props: {
  children?: ReactNode;
  type?: keyof typeof types;
  weight?: keyof typeof weight;
  font?: keyof typeof fonts;
  color?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  transform?: keyof typeof transform;
}) {
  const Component = props.as ?? "span";

  return (
    <Component
      className={clsx(
        types[props.type ?? "defaultStyle"],
        props.weight && weight[props.weight],
        props.font && fonts[props.font],
        props.transform && transform[props.transform],
        props.className,
      )}
      style={
        {
          "--text-color": props.color,
        } as CSSProperties
      }
    >
      {props.children}
    </Component>
  );
}
