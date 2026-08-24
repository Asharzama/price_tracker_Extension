import type { Product } from "../../shared/types/product";

export interface AlertResult {
  shouldNotify: boolean;

  reason: "TARGET_PRICE" | "PERCENTAGE_DROP" | "PRICE_DROP" | "NONE";
}

export class AlertService {
  static evaluate(product: Product, newPrice: number): AlertResult {
    const oldPrice = product.price;

    const settings = product.alertSettings;

    if (!settings) {
      return {
        shouldNotify: newPrice < oldPrice,
        reason: newPrice < oldPrice ? "PRICE_DROP" : "NONE",
      };
    }

    if (
      settings.targetPrice &&
      product.targetPrice !== undefined &&
      newPrice <= product.targetPrice
    ) {
      return {
        shouldNotify: true,
        reason: "TARGET_PRICE",
      };
    }

    if (settings.priceDrop && newPrice < oldPrice) {
      if (settings.minimumDropPercentage !== undefined) {
        const percentageDrop = ((oldPrice - newPrice) / oldPrice) * 100;

        if (percentageDrop >= settings.minimumDropPercentage) {
          return {
            shouldNotify: true,
            reason: "PERCENTAGE_DROP",
          };
        }

        return {
          shouldNotify: false,
          reason: "NONE",
        };
      }

      return {
        shouldNotify: true,
        reason: "PRICE_DROP",
      };
    }

    return {
      shouldNotify: false,
      reason: "NONE",
    };
  }
}
