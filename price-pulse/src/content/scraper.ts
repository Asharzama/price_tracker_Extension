import type { ScrapedProduct } from "../shared/types/scrapedProduct";
import { scrapeAmazon } from "./sites/amazon";

export function scrapeCurrentSite(): ScrapedProduct | null {
  const host = window.location.hostname;

  switch (true) {
    case host.includes("amazon."):
      return scrapeAmazon();

    default:
      return null;
  }
}