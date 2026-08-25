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

  targetPrice?: number;

  alertSettings?: AlertSettings;

  targetPriceAlerted?: boolean;

  priceDropAlerted?: boolean;
}

export interface AlertSettings {
  priceDrop: boolean;

  targetPrice: boolean;

  minimumDropPercentage?: number;
}