import type { ScrapedProduct } from "../../shared/types/scrapedProduct";
import type { SiteScraper } from "./site-scraper";

export class FlipkartScraper implements SiteScraper {
  canHandle(hostname: string): boolean {
    return hostname.includes("flipkart.com");
  }

  scrape(): ScrapedProduct | null {
    const title = document.querySelector("h1")?.textContent?.trim() ?? "";

    const priceElement = [...document.querySelectorAll("div, span")].find(
      (element) => {
        const text = element.textContent?.trim() ?? "";

        return /^₹[\d,]+$/.test(text);
      },
    );

    const price = priceElement?.textContent?.trim() ?? "";

    const image =
      document.querySelector<HTMLImageElement>(
        'picture img[src*="rukminim2.flixcart.com/image/"]',
      )?.src ?? "";

    if (!title || !price) {
      return null;
    }

    return {
      title,
      price,
      website: window.location.hostname,
      url: window.location.href,
      image,
    };
  }
}
