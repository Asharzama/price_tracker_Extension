import { scrapeAmazon } from "./scraper";
import type {
  ExtensionMessage,
  GetProductResponse,
} from "../shared/messaging/messages";

console.log("PricePulse Loaded");

chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    _sender,
    sendResponse
  ) => {
    switch (message.type) {
      case "GET_PRODUCT": {
        const response: GetProductResponse = {
          product: scrapeAmazon(),
        };

        sendResponse(response);
        break;
      }
    }

    return true;
  }
);