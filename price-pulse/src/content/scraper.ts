import type { ScrapedProduct } from "../types/scrapedProduct";

export function scrapeAmazon(): ScrapedProduct | null {
  // Only scrape real product pages
  const isProductPage =
    window.location.pathname.includes("/dp/") ||
    window.location.pathname.includes("/gp/product/");

  if (!isProductPage) {
    console.log("❌ Not an Amazon product page");
    return null;
  }

  const titleElement = document.querySelector("#productTitle");

  if (!titleElement) {
    console.log("❌ Product title not found");
    return null;
  }

  return {
    title: titleElement.textContent?.trim() ?? "",
    price: null,
    url: window.location.href,
    website: window.location.hostname,
  };
}