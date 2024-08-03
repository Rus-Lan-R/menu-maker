export default function alwaysFunction<T extends (...args: any[]) => unknown>(
  origin: T | undefined,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args) => {
    if (origin) {
      return origin(...args) as ReturnType<T>;
    }

    return undefined;
  };
}
