import type { ScrapedProduct } from "../../shared/types/scrapedProduct";
import type { GetProductResponse } from "../../shared/messaging/messages";

export class BrowserService {
  static async openHiddenTab(url: string): Promise<number> {
    const tab = await chrome.tabs.create({
      url,
      active: false,
    });

    if (tab.id === undefined) {
      throw new Error("Failed to create monitoring tab.");
    }

    return tab.id;
  }

  static async waitForTabComplete(tabId: number): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const listener = (
        updatedTabId: number,
        changeInfo: {
          status?: string;
        },
      ) => {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };

      chrome.tabs.onUpdated.addListener(listener);

      setTimeout(() => {
        chrome.tabs.onUpdated.removeListener(listener);
        reject(new Error(`Timed out waiting for tab ${tabId}.`));
      }, 30_000);
    });
  }

  static async getProductFromTab(
    tabId: number,
  ): Promise<ScrapedProduct | null> {
    const response = await chrome.tabs.sendMessage<
      { type: "GET_PRODUCT" },
      GetProductResponse
    >(tabId, {
      type: "GET_PRODUCT",
    });

    return response.product;
  }

  static async closeTab(tabId: number): Promise<void> {
    await chrome.tabs.remove(tabId);
  }
}
