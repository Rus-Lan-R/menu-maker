export default function optimizedReflowValue<
  T extends (...args: any[]) => unknown,
>(origin: T): T {
  let value: ReturnType<T> | undefined;
  let valueInited = false;
  let valueRequested = false;

  return ((...args) => {
    if (!valueInited) {
      value = origin(...args) as ReturnType<T>;
      valueInited = true;

      return value;
    }

    if (!valueRequested) {
      valueRequested = true;

      window.requestAnimationFrame(() => {
        valueRequested = false;

        value = origin(...args) as ReturnType<T>;
      });
    }

    return value;
  }) as T;
}
