export function parsePrice(price: string): number {
  const numeric = price.replace(/[^\d.]/g, "");

  return Number(numeric);
}