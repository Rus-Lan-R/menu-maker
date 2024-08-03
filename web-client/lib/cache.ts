export function cacheOne<T extends (arg: any) => unknown>(origin: T): T {
  const cached = new Map();

  return ((arg) => {
    if (!cached.has(arg)) {
      cached.set(arg, origin(arg));
    }

    return cached.get(arg);
  }) as T;
}
