import { MessageType } from "../types/messages";
import type { GetProductResponse } from "../types/messages";
import type { ScrapedProduct } from "../types/scrapedProduct";

export class ProductService {
  static async getCurrentProduct(): Promise<ScrapedProduct | null> {
    // Get the currently active browser tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id) {
      return null;
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
  type: MessageType.GET_PRODUCT,
}) as GetProductResponse;

    return response.product;
  }
}