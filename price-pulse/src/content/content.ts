import { scrapeAmazon } from "./scraper";
import { MessageType } from "../types/messages";

console.log("PricePulse Content Script Loaded");

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === MessageType.GET_PRODUCT) {
    const product = scrapeAmazon();

    sendResponse({
      product,
    });
  }

  return true;
});