import { TrackingService } from "../../shared/services/tracking.service";
import { BrowserService } from "./browser.service";

export class MonitoringService {
  static async checkAllProducts() {
    console.log("🔍 Starting monitoring...");

    const products = await TrackingService.getTrackedProducts();

    console.log(`Found ${products.length} tracked products`);

    for (const product of products) {
      console.log("Checking:", product.title);

      const tabId = await BrowserService.openHiddenTab(product.url);

      await BrowserService.waitForTabComplete(tabId);

      const latest = await BrowserService.getProductFromTab(tabId);

      console.log("Latest Product:", latest);

      await BrowserService.closeTab(tabId);
    }

    console.log("✅ Monitoring completed");
  }
}
