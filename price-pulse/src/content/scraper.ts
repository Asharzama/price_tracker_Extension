import type { ScrapedProduct } from "../shared/types/scrapedProduct";
import type { SiteScraper } from "./sites/site-scraper";
import { AmazonScraper } from "./sites/amazon";
import { FlipkartScraper } from "./sites/flipkart";

const scrapers: SiteScraper[] = [new AmazonScraper(), new FlipkartScraper()];

export function scrapeCurrentSite(): ScrapedProduct | null {
  const hostname = window.location.hostname;

  const scraper = scrapers.find((scraper) => scraper.canHandle(hostname));

  return scraper?.scrape() ?? null;
}
