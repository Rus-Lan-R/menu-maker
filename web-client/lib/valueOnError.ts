export default function valueOnError<T extends (...args: any[]) => unknown, V>(
  origin: T,
  value: () => V,
): (...args: Parameters<T>) => ReturnType<T> | V {
  return (...args) => {
    try {
      const result = origin(...args) as ReturnType<T>;

      if (result instanceof Promise) {
        return new Promise((resolve) => {
          result.then(resolve).catch(() => resolve(value()));
        }) as ReturnType<T>;
      }

      return result;
    } catch (error) {
      console.error(error);

      return value();
    }
  };
}
