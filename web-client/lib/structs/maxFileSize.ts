import { Struct, define, validate } from "superstruct";

export function maxFileSize(
  struct: Struct<File, null>,
  megabytes: number,
  message?: string,
): Struct<File, null> {
  return define("MaxFileSize", (value) => {
    if (
      (value as File | undefined)?.size !== undefined &&
      (value as File).size > megabytes * 1024 * 1024
    ) {
      return message ?? `Maximum file size: ${megabytes}MB`;
    }

    const [error] = validate(value, struct);

    return !error ? true : error.message;
  });
}
