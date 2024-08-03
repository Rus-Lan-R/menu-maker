export const toNumber = (value: string | number) =>
  typeof value === "number" ? value : parseInt(value, 10);
