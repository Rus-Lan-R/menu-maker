import optimizedReflowValue from "./optimizedReflowValue";
import roundTo from "./roundTo";

export default function rem(origin: number | string, round = 2): string {
  return `${roundTo(parseFloat(String(origin)) / 16, round)}rem`;
}

export function remOrPercentages(value: number | string): string {
  if (typeof value === "number") return rem(value);

  if (/.+%$/.test(value)) {
    return value;
  }

  return rem(value);
}

const windowWidth = optimizedReflowValue(() => window.innerWidth);

export function currentPx(px: number): number {
  const currentWindowWidth = windowWidth();

  if (currentWindowWidth < 375) {
    return px * (currentWindowWidth / 375);
  }

  if (currentWindowWidth > 2000) {
    return px * (currentWindowWidth / 2000);
  }

  return px;
}
