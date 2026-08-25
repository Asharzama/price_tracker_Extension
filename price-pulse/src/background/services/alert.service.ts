import type { Product } from "../../shared/types/product";

export interface AlertResult {
  shouldNotify: boolean;

  reason: "TARGET_PRICE" | "PERCENTAGE_DROP" | "PRICE_DROP" | "NONE";

  targetReached?: boolean;

  priceDropReached?: boolean;
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

    /*
     * Target price alert
     */
    if (
      settings.targetPrice &&
      product.targetPrice !== undefined &&
      newPrice <= product.targetPrice
    ) {
      if (product.targetPriceAlerted) {
        return {
          shouldNotify: false,
          reason: "NONE",
          targetReached: true,
        };
      }

      return {
        shouldNotify: true,
        reason: "TARGET_PRICE",
        targetReached: true,
      };
    }

    /*
     * Re-arm target alert if price
     * rises above the target.
     */
    if (product.targetPrice !== undefined && newPrice > product.targetPrice) {
      return {
        shouldNotify: false,
        reason: "NONE",
        targetReached: false,
      };
    }

    /*
     * Percentage price-drop alert
     */
    if (settings.priceDrop && newPrice < oldPrice) {
      if (settings.minimumDropPercentage !== undefined) {
        const percentageDrop = ((oldPrice - newPrice) / oldPrice) * 100;

        if (percentageDrop >= settings.minimumDropPercentage) {
          if (product.priceDropAlerted) {
            return {
              shouldNotify: false,
              reason: "NONE",
              priceDropReached: true,
            };
          }

          return {
            shouldNotify: true,
            reason: "PERCENTAGE_DROP",
            priceDropReached: true,
          };
        }

        return {
          shouldNotify: false,
          reason: "NONE",
        };
      }

      if (!product.priceDropAlerted) {
        return {
          shouldNotify: true,
          reason: "PRICE_DROP",
          priceDropReached: true,
        };
      }
    }

    /*
     * Price increased enough to re-arm
     * the percentage alert.
     */
    if (newPrice > oldPrice) {
      return {
        shouldNotify: false,
        reason: "NONE",
        priceDropReached: false,
      };
    }

    return {
      shouldNotify: false,
      reason: "NONE",
    };
  }
}
