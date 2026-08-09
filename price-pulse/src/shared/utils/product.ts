import type { Product } from "../types/product";

export function getLatestPrice(product: Product) {
  return product.history.at(-1);
}

export function getLowestPrice(product: Product) {
  return [...product.history].sort(
    (a, b) => a.price - b.price
  )[0];
}

export function getHighestPrice(product: Product) {
  return [...product.history].sort(
    (a, b) => b.price - a.price
  )[0];
}

export function getPriceChange(product: Product): number {
  if (product.history.length < 2) {
    return 0;
  }

  const first = product.history[0].price;
  const latest = product.history.at(-1)!.price;

  return latest - first;
}