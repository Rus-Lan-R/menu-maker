import { freeModules } from "@/modules";
import { FreeModule, SanityData } from "./freeModule";
import { nonNullable } from "../nonNullable";
import { logOnError } from "../logOnError";
import { cacheOne } from "../cache";
import alwaysFunction from "../alwaysFunction";
import valueOnError from "../valueOnError";
import { incorrectModule } from "@/modules/IncorrectModule/module";

const freeModulesByKey = cacheOne(
  (
    origin: () => FreeModule[],
  ): (() => Record<string, FreeModule["module"]>) => {
    return () => {
      const output: Record<string, FreeModule["module"]> = {};

      origin().forEach((moduleType) => {
        output[moduleType.name] = moduleType.module;
      });

      return output;
    };
  },
);

const freeModuleByKey = cacheOne(
  (origin: () => FreeModule[]): ((type: string) => FreeModule["module"]) => {
    return (type) =>
      nonNullable(freeModulesByKey(origin)()[type], `Module ${type} not found`);
  },
);

export type FreeModuleList = (list: SanityData[]) => {
  Render(): JSX.Element[];
};

const moduleByName = cacheOne(logOnError(freeModuleByKey(freeModules)));
const safeModuleByName = (type: string, params: SanityData) =>
  valueOnError(alwaysFunction(moduleByName(type)), () =>
    incorrectModule.module(params),
  )(params);

export const FreeModuleListFromServer: FreeModuleList = (list) => {
  const modules = list
    .map((params) => safeModuleByName(params._type, params))
    .filter(
      (module): module is NonNullable<typeof module> => module !== undefined,
    )
    .map((Module) => <Module.Render key={Module.key}></Module.Render>);

  return {
    Render() {
      return modules;
    },
  };
};
