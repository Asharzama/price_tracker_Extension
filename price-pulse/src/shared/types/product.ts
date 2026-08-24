import type { PriceHistory } from "./priceHistory";

export interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  website: string;
  url: string;
  createdAt: number;

  history: PriceHistory[];
}