import type { ScrapedProduct } from "../../shared/types/scrapedProduct";
import type { SiteScraper } from "./site-scraper";

function getAmazonCurrency(hostname: string): string {
  if (hostname.endsWith(".in")) {
    return "INR";
  }

  if (hostname.endsWith(".com")) {
    return "USD";
  }

  return "UNKNOWN";
}

export class AmazonScraper implements SiteScraper {
  canHandle(hostname: string): boolean {
    return hostname.includes("amazon.");
  }

  scrape(): ScrapedProduct | null {
    const title =
      document.querySelector("#productTitle")?.textContent?.trim() ?? "";

    const price =
      document.querySelector(".a-price .a-offscreen")?.textContent?.trim() ??
      "";

    const image =
      document.querySelector<HTMLImageElement>("#landingImage")?.src ?? "";

    if (!title) {
      return null;
    }

    return {
      title,
      price,
      website: window.location.hostname,
      url: window.location.href,
      image,
      currency: getAmazonCurrency(window.location.hostname),
    };
  }
}
