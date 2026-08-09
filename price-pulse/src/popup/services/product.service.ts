import type {
  GetProductMessage,
  GetProductResponse,
} from "../../shared/messaging/messages";
import type { ScrapedProduct } from "../../shared/types/scrapedProduct";

export async function getCurrentProduct(): Promise<ScrapedProduct | null> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) {
    return null;
  }

  const message: GetProductMessage = {
    type: "GET_PRODUCT",
  };

  const response = (await chrome.tabs.sendMessage(
    tab.id,
    message
  )) as GetProductResponse;

  return response.product;
}