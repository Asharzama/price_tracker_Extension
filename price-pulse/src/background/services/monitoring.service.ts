import { TrackingService } from "../../shared/services/tracking.service";
import { AlertService } from "./alert.service";
import { NotificationService } from "./notification.service";
import { BrowserService } from "./browser.service";
import { PriceUtil } from "../../shared/utils/price";
import { StorageService } from "../../shared/storage/storage";

export class MonitoringService {
  static async checkAllProducts() {
    const products = await TrackingService.getTrackedProducts();

    for (const product of products) {
      console.log(`Checking: ${product.title}`);

      let tabId: number | undefined;

      try {
        tabId = await BrowserService.openHiddenTab(product.url);

        await BrowserService.waitForTabComplete(tabId);

        const latest = await BrowserService.getProductFromTab(tabId);

        if (!latest) {
          console.warn(`Could not scrape: ${product.title}`);

          continue;
        }

        product.currency = latest.currency;
        
        const latestPrice = PriceUtil.parse(latest.price);

        const oldPrice = product.price;

        const alertResult = AlertService.evaluate(product, latestPrice);

        if (alertResult.targetReached !== undefined) {
          product.targetPriceAlerted = alertResult.targetReached;
        }

        if (alertResult.priceDropReached !== undefined) {
          product.priceDropAlerted = alertResult.priceDropReached;
        }

        if (latestPrice === oldPrice) {
          console.log("No price change.");

          continue;
        }

        console.log(`Price changed ${oldPrice} -> ${latestPrice}`);

        if (alertResult.shouldNotify) {
          try {
            await NotificationService.showPriceDrop(
              product.title,
              oldPrice,
              latestPrice,
              latest.price,
              product.url,
              alertResult.reason,
            );
          } catch (error) {
            console.error("Failed to show notification:", error);
          }
        }

        product.price = latestPrice;

        product.history.push({
          checkedAt: Date.now(),
          price: latestPrice,
          displayPrice: latest.price,
          currency: latest.currency,
        });
      } catch (error) {
        console.error(`Failed to monitor ${product.title}:`, error);
      } finally {
        if (tabId !== undefined) {
          try {
            await BrowserService.closeTab(tabId);
          } catch (error) {
            console.error(`Failed to close monitoring tab ${tabId}:`, error);
          }
        }
      }
    }
    await StorageService.saveProducts(products);
  }
}
