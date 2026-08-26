import type { ScrapedProduct } from "../shared/types/scrapedProduct";
import { ScraperRegistry } from "./sites/scraper-registry";

export function scrapeCurrentSite(): ScrapedProduct | null {
  return ScraperRegistry.scrape(window.location.hostname);
}
