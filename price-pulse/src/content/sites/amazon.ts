import type { ScrapedProduct } from "../../shared/types/scrapedProduct";

export function scrapeAmazon(): ScrapedProduct | null {
  const title =
    document.querySelector("#productTitle")?.textContent?.trim() ?? "";

  const price =
    document.querySelector(".a-price .a-offscreen")?.textContent?.trim() ??
    "";

    const image = document
    .querySelector<HTMLImageElement>("#landingImage")
    ?.src ?? "";

  if (!title) {
    return null;
  }

  return {
    title,
    price,
    website: window.location.hostname,
    url: window.location.href,
    image: image,
  };
}