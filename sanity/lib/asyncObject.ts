import mutateWith from './mutateWith'

export function asyncObject<T extends object>(
  origin: () => T | Promise<T>,
  placeholder: T extends unknown[] ? unknown[] : Partial<T>,
): Partial<T> | unknown[] {
  setTimeout(async () => {
    mutateWith(placeholder as object, origin)
  }, 0)

  return placeholder
}
