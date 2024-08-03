import { Infer, array, literal, object, optional, string } from "superstruct";
import { sanityData } from "./freeModule";

export const customModulesType = array(
  object({
    _id: string(),
    _type: literal("customModule"),
    title: optional(string()),
    modules: optional(array(sanityData)),
  }),
);

type CustomModules = Infer<typeof customModulesType>;

function isReference(value: unknown): value is {
  _type: string;
  _ref: string;
  _key: string;
} {
  return (value as any)?._type === "reference";
}

export function unwrapCustomModules<T>(
  origin: T,
  customModules: CustomModules,
): T {
  if (typeof origin !== "object") {
    return origin;
  }

  if (!origin) {
    return origin;
  }

  if (Array.isArray(origin)) {
    return origin.map((item) => unwrapCustomModules(item, customModules)) as T;
  }

  if (isReference(origin)) {
    const customModule = customModules.find(
      (module) => module._id === origin._ref,
    );

    if (customModule) {
      return { ...customModule, _key: origin._key } as T;
    }
  }

  const newObject = {} as T;

  Object.keys(origin).forEach((key) => {
    newObject[key as keyof typeof origin] = unwrapCustomModules(
      origin[key as keyof typeof origin],
      customModules,
    );
  });

  return newObject;
}
