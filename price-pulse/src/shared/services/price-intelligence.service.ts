import type { PriceHistory } from "../types/priceHistory";

export type PricePosition = "LOW" | "AVERAGE" | "HIGH";

export interface PriceStatistics {
  current: number;
  lowest: number;
  highest: number;
  average: number;
  historyCount: number;
  positionPercentage: number;
  position: PricePosition;
}

export class PriceIntelligenceService {
  static calculateStatistics(history: PriceHistory[]): PriceStatistics | null {
    if (history.length === 0) {
      return null;
    }

    const prices = history.map((entry) => entry.price);

    const current = prices[prices.length - 1];

    const lowest = Math.min(...prices);

    const highest = Math.max(...prices);

    const average =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;

    const range = highest - lowest;

    const positionPercentage =
      range === 0 ? 0 : ((current - lowest) / range) * 100;
    let position: PricePosition;

    if (prices.length < 2) {
      position = "AVERAGE";
    } else if (positionPercentage <= 30) {
      position = "LOW";
    } else if (positionPercentage <= 70) {
      position = "AVERAGE";
    } else {
      position = "HIGH";
    }

    return {
      current,
      lowest,
      highest,
      average,
      historyCount: prices.length,
      positionPercentage,
      position,
    };
  }
}
