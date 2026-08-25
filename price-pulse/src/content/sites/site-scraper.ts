import type { ScrapedProduct } from "../../shared/types/scrapedProduct";

export interface SiteScraper {
  canHandle(hostname: string): boolean;

  scrape(): ScrapedProduct | null;
}