import { FreeModule } from "@/lib/module/freeModule";
import Text from "./Text";
import { object, mask, any } from "superstruct";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { imageModule } from "../Image/module";
import { Fragment } from "react";
import Link from "next/link";
import InlineLink from "@/components/InlineLink/InlineLink";

export const schema = object({
  text: any(),
});

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: (props) => {
      const Module = imageModule.module({
        _key: props.value._key,
        _type: "module.image",
        image: {
          asset: props.value.asset,
        },
      });

      return <Module.Render></Module.Render>;
    },
  },
  block: {
    normal: (props) => {
      const Component = props.value.children.length > 1 ? "p" : Fragment;

      return <Component>{props.children}</Component>;
    },
    h1: (props) => (
      <Text type="h1" as={props.isInline ? "span" : "h1"} font="mabryPro">
        {props.children}
      </Text>
    ),
    h2: (props) => (
      <Text type="h2" as={props.isInline ? "span" : "h2"} font="mabryPro">
        {props.children}
      </Text>
    ),
    h3: (props) => (
      <Text type="h3" as={props.isInline ? "span" : "h3"} font="mabryPro">
        {props.children}
      </Text>
    ),
    h4: (props) => (
      <Text type="h4" as={props.isInline ? "span" : "h4"} font="mabryPro">
        {props.children}
      </Text>
    ),
    h5: (props) => (
      <Text type="h5" as={props.isInline ? "span" : "h5"} font="mabryPro">
        {props.children}
      </Text>
    ),
    h6: (props) => (
      <Text type="h6" as={props.isInline ? "span" : "h6"} font="mabryPro">
        {props.children}
      </Text>
    ),
    descriptor1: (props) => (
      <Text
        type="descriptor1"
        as={props.isInline ? "span" : "div"}
        font="inter"
      >
        {props.children}
      </Text>
    ),
    text1: (props) => (
      <Text type="text1" as={props.isInline ? "span" : "div"} font="inter">
        {props.children}
      </Text>
    ),
  },
  marks: {
    color: (props) => {
      return <Text color={props.value.color}>{props.children}</Text>;
    },
    font: (props) => {
      return <Text font={props.value.font}>{props.children}</Text>;
    },
    tag: (props) => {
      const Tag = props.value.tag as keyof JSX.IntrinsicElements;

      return <Tag>{props.children}</Tag>;
    },
    link: (props) => {
      return (
        <Link
          href={props.value.href}
          target={props.value.blank ? "_blank" : undefined}
        >
          <InlineLink>{props.children}</InlineLink>
        </Link>
      );
    },
  },
};

export const textModule: FreeModule = {
  name: "module.text",
  module: (params) => {
    const validated = mask(params, schema);

    return {
      key: params._key,
      Render() {
        return (
          <PortableText
            value={validated.text}
            components={components}
          ></PortableText>
        );
      },
    };
  },
};
