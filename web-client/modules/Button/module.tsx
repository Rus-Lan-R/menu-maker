import Button, { palette } from "./Button";
import { object, optional, string, mask, array } from "superstruct";
import clsx from "clsx";
import { FreeModule, sanityData } from "@/lib/module/freeModule";
import { FreeModuleListFromServer } from "@/lib/module/freeModuleList";

export const schema = object({
  _key: string(),
  content: array(sanityData),
  link: optional(string()),
  size: string(),
  color: string(),
});

export const buttonModule: FreeModule = {
  name: "module.button",
  module: (params) => {
    const validated = mask(params, schema);
    const Content = FreeModuleListFromServer(validated.content);

    return {
      key: validated._key,
      Render() {
        return (
          <Button
            palette={clsx(
              palette[validated.size as keyof typeof palette],
              palette[validated.color as keyof typeof palette],
            )}
            href={validated.link}
          >
            {Content.Render()}
          </Button>
        );
      },
    };
  },
};
