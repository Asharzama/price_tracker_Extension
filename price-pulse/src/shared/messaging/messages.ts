import type { ScrapedProduct } from "../types/scrapedProduct";

export type GetProductMessage = {
  type: "GET_PRODUCT";
};

export type ExtensionMessage = GetProductMessage;

export type GetProductResponse = {
  product: ScrapedProduct | null;
};