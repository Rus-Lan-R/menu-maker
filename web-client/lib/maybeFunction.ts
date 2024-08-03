type AnyFunction = (...args: any[]) => unknown;

type GuaranteedFunction<T> = T extends AnyFunction ? T : () => T;

export default function maybeFunction<T>(value: T) {
  return ((...args: Parameters<GuaranteedFunction<T>>) => {
    return typeof value === "function" ? value(...args) : value;
  }) as GuaranteedFunction<T>;
}
