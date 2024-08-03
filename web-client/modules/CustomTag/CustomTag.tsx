import { ReactNode, useMemo } from "react";

export interface ICustomAttribute {
  name: string;
  value: string;
}

export interface ICustomTag {
  name: string;
  attributes?: ICustomAttribute[];
}

export default function CustomTag(props: {
  tag: ICustomTag;
  children?: ReactNode;
}) {
  const Tag = props.tag.name as any;

  const attributes = useMemo(() => {
    const output: Record<string, string> = {};

    props.tag.attributes?.forEach((attribute) => {
      output[attribute.name] = attribute.value;
    });

    return output;
  }, props.tag.attributes);

  if (props.children) {
    return <Tag {...attributes}>{props.children}</Tag>;
  }

  return <Tag {...attributes} />;
}
