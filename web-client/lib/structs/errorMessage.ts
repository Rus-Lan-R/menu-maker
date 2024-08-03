/* eslint-disable @typescript-eslint/no-explicit-any */
import { Struct, define, is } from "superstruct";

export const message = <T>(
  struct: Struct<T, any>,
  text: string,
): Struct<T, any> =>
  define("message", (value) => (is(value, struct) ? true : text));
