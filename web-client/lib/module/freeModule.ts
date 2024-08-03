import { ReactNode } from "react";
import { literal, object, string, type } from "superstruct";

export type SanityData = { _type: string; _key: string } & Record<
  string,
  unknown
>;

export const sanityData = type({
  _type: string(),
  _key: string(),
});

export const imageStruct = object({
  asset: object({
    _ref: string(),
    _type: literal("reference"),
  }),
});

export interface FreeModule {
  name: string;
  module: (params: SanityData) => {
    key: string;
    Render(): ReactNode;
  };
}
