export function logOnError<T extends (...args: any[]) => unknown>(
  origin: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args) => {
    try {
      return origin(...args) as ReturnType<T>;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  };
}
