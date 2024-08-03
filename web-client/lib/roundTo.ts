export default function roundTo(number: number, to: number) {
  const pow = 10 ** to;

  return Math.round(number * pow) / pow;
}
