import type { ScrapedProduct } from "../../shared/types/scrapedProduct";
import type { SiteScraper } from "./site-scraper";

import { AmazonScraper } from "./amazon";
import { FlipkartScraper } from "./flipkart";

export class ScraperRegistry {
  private static readonly scrapers: SiteScraper[] = [
    new AmazonScraper(),
    new FlipkartScraper(),
  ];

  static getScraper(hostname: string): SiteScraper | null {
    return this.scrapers.find((scraper) => scraper.canHandle(hostname)) ?? null;
  }

  static scrape(hostname: string): ScrapedProduct | null {
    const scraper = this.getScraper(hostname);

    return scraper?.scrape() ?? null;
  }
}
