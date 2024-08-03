import { Struct, define, validate } from "superstruct";

function fileExt(name: string): string {
  const exploded = name.split(".");

  return exploded[exploded.length - 1] as string;
}

export function fileType(
  struct: Struct<File, null>,
  types: string[],
  message?: string,
): Struct<File, null> {
  return define("SelectedFileType", (value) => {
    if (
      !types.includes(fileExt((value as Partial<File>)?.name?.trim() ?? ""))
    ) {
      return message ?? `Allowed formats: ${types.join(", ")}`;
    }

    const [error] = validate(value, struct);

    return !error ? true : error.message;
  });
}
