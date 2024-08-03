import { FreeModule, sanityData } from "@/lib/module/freeModule";
import CustomTag from "./CustomTag";
import { object, mask, array, string, optional } from "superstruct";
import { FreeModuleListFromServer } from "@/lib/module/freeModuleList";

export const CustomAttribute = object({
  name: string(),
  value: string(),
});

export const CustomTagStruct = object({
  name: string(),
  attributes: optional(array(CustomAttribute)),
  children: optional(array(sanityData)),
});

export const customTagModule: FreeModule = {
  name: "module.customTag",
  module: (params) => {
    const validated = mask(params, CustomTagStruct);
    const Children =
      validated.children && FreeModuleListFromServer(validated.children);

    return {
      key: params._key,
      Render() {
        return (
          <CustomTag tag={validated}>
            {Children && <Children.Render></Children.Render>}
          </CustomTag>
        );
      },
    };
  },
};
