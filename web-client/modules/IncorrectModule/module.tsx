import { FreeModule } from "@/lib/module/freeModule";

export const incorrectModule: FreeModule = {
  name: "module.inner.incorrect",
  module: (params) => {
    return {
      key: params._key,
      Render() {
        return (
          <>
            Module "{params._type ?? ""}" is incorrect. Please fix the latest
            changed module in Sanity or connect with your developer
          </>
        );
      },
    };
  },
};
