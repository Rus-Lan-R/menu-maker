export default function mutateWith<T extends object>(
  origin: T,
  additional: () => T | Promise<T>
): T {
  async function asyncHandle() {
    const final = await additional()

    if (Array.isArray(final)) {
      final.forEach((item) => (origin as unknown[]).push(item))
    } else {
      Object.keys(final).forEach((finalKey) => {
        const item = final[finalKey as keyof typeof final]

        ;(origin as Record<string, unknown>)[finalKey] = item
      })
    }
  }

  asyncHandle()

  return origin
}
