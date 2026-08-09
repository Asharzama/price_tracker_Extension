import type { PriceHistory } from "./priceHistory";

export interface Product {
  id: string;

  title: string;

  website: string;

  url: string;

  image?: string;

  createdAt: number;

  history: PriceHistory[];
}