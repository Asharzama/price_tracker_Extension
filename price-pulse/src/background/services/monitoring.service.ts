import { TrackingService } from "../../shared/services/tracking.service";
import { NotificationService } from "./notification.service";
import { BrowserService } from "./browser.service";
import { PriceUtil } from "../../shared/utils/price";
import { StorageService } from "../../shared/storage/storage";

export class MonitoringService {
  static async checkAllProducts() {
    console.log("🔍 Starting monitoring...");

    const products = await TrackingService.getTrackedProducts();

    console.log(`Found ${products.length} tracked products`);

    for (const product of products) {
      console.log("Checking:", product.title);

      const tabId = await BrowserService.openHiddenTab(product.url);

      try {
        await BrowserService.waitForTabComplete(tabId);

        const latest = await BrowserService.getProductFromTab(tabId);

        if (!latest) {
          console.log("Could not scrape:", product.title);
          continue;
        }

        const latestPrice = PriceUtil.parse(latest.price);

        if (latestPrice === product.price) {
          console.log("No price change.");
          continue;
        }

        const oldPrice = product.price;

        console.log(`Price changed ${oldPrice} -> ${latestPrice}`);

        product.price = latestPrice;

        product.history.push({
          checkedAt: Date.now(),
          price: latestPrice,
          displayPrice: latest.price,
        });

        if (latestPrice < oldPrice) {
          try {
            await NotificationService.showPriceDrop(
              product.title,
              oldPrice,
              latestPrice,
              latest.price,
              product.url,
            );
          } catch (error) {
            console.error("Failed to show price notification:", error);
          }
        }
      } finally {
        await BrowserService.closeTab(tabId);
      }
    }
    await StorageService.saveProducts(products);
    console.log("✅ Monitoring completed");
  }
}
