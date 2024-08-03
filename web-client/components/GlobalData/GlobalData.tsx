import { ReactNode, createContext, useContext } from "react";
import { Infer, object, optional, string } from "superstruct";

export const globalData = {
  formBudgetMinMaxDevelopment: optional(
    object({
      min: optional(string()),
      max: optional(string()),
    }),
  ),
  formBudgetMinMaxProduction: optional(
    object({
      min: optional(string()),
      max: optional(string()),
    }),
  ),
};

export const globalDataStruct = object(globalData);

export type IGlobalData = Infer<typeof globalDataStruct>;

const Context = createContext<IGlobalData | undefined>({});

export function GlobalData(props: {
  value: IGlobalData | undefined;
  children: ReactNode;
}) {
  return (
    <Context.Provider value={props.value}>{props.children}</Context.Provider>
  );
}

export function useGlobalData() {
  return useContext(Context) ?? {};
}
